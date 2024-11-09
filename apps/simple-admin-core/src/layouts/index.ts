const LAYOUT = () => import('./basic.vue');
const AuthPageLayout = () => import('./auth.vue');

const IFrame = () => import('@vben/layouts').then((m) => m.IFrameView);

export { AuthPageLayout, IFrame, LAYOUT };
