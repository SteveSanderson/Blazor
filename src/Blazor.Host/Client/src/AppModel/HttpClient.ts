import { platform } from '../Environment';
import { System_Object, MethodHandle } from '../Platform/Platform';

let notifyRequestCompletedMethod: MethodHandle;

platform.registerCallableMethod('HttpClient_IssueRequest', issueRequest);

async function issueRequest(request: RequestMessage) {
    if (!notifyRequestCompletedMethod) {
        notifyRequestCompletedMethod = platform.findMethod('Blazor.Runtime', 'Blazor.Runtime.FakeBcl', 'HttpClient', 'NotifyRequestCompletion');
    }

    let resultDescriptor: string;
    try {
        // TODO: Use XHR so as to support old browsers
        const response = await fetch(request.url);
        const responseBodyText = await response.text();
        resultDescriptor = JSON.stringify({
            handle: request.completionHandle,
            text: responseBodyText,
            statusCode: response.status
        });
    } catch (ex) {
        const resultDescriptor = JSON.stringify({
            handle: request.completionHandle,
            error: ex.toString()
        });
        platform.callMethod(notifyRequestCompletedMethod, null, [platform.toDotNetString(resultDescriptor)]);
        return;
    }

    platform.callMethod(notifyRequestCompletedMethod, null, [platform.toDotNetString(resultDescriptor)]);
}

interface RequestMessage {
    completionHandle: string;
    url: string;
}
