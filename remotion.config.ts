import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setChromiumDisableWebSecurity(true);
Config.setChromiumOpenGlRenderer(null);
Config.setDelayRenderTimeoutInMilliseconds(60000);
