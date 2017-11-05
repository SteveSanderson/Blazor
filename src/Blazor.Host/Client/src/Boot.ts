import { platform } from './Environment';
import { getAssemblyNameFromUrl } from './Platform/DotNet';
import { initRouter } from './AppModel/Routing';
import { enableLiveReloading } from './LiveReload';
import { displayErrorPage } from './ErrorPage';
import './AppModel/VirtualDom/VDom';
import './AppModel/HttpClient';
import './AppModel/JSObject';

async function boot() {
    enableLiveReloading();

    // Read startup config from the <script> element that's importing this file
    const allScriptElems = document.getElementsByTagName('script');
    const thisScriptElem = allScriptElems[allScriptElems.length - 1];
    const entryPoint = thisScriptElem.getAttribute('main');
    const referenceAssembliesCommaSeparated = thisScriptElem.getAttribute('references') || '';
    const referenceAssemblies = referenceAssembliesCommaSeparated.split(',').map(s => s.trim());

    // Determine the URLs of the assemblies we want to load
    const loadAssemblyUrls =
        [entryPoint].concat(referenceAssemblies)    // Developer-specified references
        .concat(['Blazor.Runtime.dll'])             // Standard references
        .map(filename => `/_bin/${filename}`)

    // Also infer the name of the views assembly from the entrypoint. We have to pass a special querystring
    // value with this so that the dev-time host app knows to compile the Razor files dynamically. In a production
    // build, the actual views assembly file would be on disk and the querystring would be ignored.
    const entryPointAssemblyName = getAssemblyNameFromUrl(entryPoint);
    const viewsAssemblyFilename = entryPointAssemblyName + '.Views.dll';
    loadAssemblyUrls.push(`/_bin/${viewsAssemblyFilename}?type=razorviews`);

    try {
        await platform.start(loadAssemblyUrls);
    } catch (ex) {
        displayErrorPage(ex);
        console.error(`Failed to start platform. Reason: ${ex}`)
        return;
    }

    // Register views assemblies so we know where to look for the compiled razor components
    const viewsAssemblies = [getAssemblyNameFromUrl(viewsAssemblyFilename)];
    platform.invokeSimpleStatic('Blazor.Runtime', 'Blazor.Routing', 'Router', 'SetViewAssemblies', viewsAssemblies.join(','));

    // Start up the application
    platform.callEntryPoint(entryPointAssemblyName, []);
    initRouter();
}

boot().catch(ex => { throw new Error(ex); });
