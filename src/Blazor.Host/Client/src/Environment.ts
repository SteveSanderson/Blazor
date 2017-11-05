// Expose an export called 'platform' of the interface type 'Platform',
// so that consumers can be agnostic about which implementation they use.
// Cheap alternative to having an actual DI container.
import { Platform } from './Platform/Platform';
import { monoPlatform } from './Platform/MonoPlatform';
export const platform: Platform = monoPlatform;
