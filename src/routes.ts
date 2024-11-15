import Layout from './Layout.vue';
import Button from './views/Button.vue';
import Headings from './views/Headings.vue';
import Form from './views/Form.vue';
import Colors from './views/Colors.vue';
import Input from './views/Input.vue';
import Icons from './views/Icons.vue';
import SvgEditor from './views/SvgEditor.vue';
import Size from './views/Size.vue';
import Dialog from './views/Dialog.vue';
import Sidebar from './views/Sidebar.vue';
import Toast from './views/Toast.vue';
import Welcome from './views/Welcome.vue';

export const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Welcome,
      },
      {
        path: '/heading',
        component: Headings,
      },
      {
        path: '/button',
        component: Button,
      },
      {
        path: '/form',
        component: Form,
      },
      {
        path: '/colors',
        component: Colors,
      },
      {
        path: '/icons',
        component: Icons,
      },
      {
        path: '/svg',
        component: SvgEditor,
      },
      {
        path: '/input',
        component: Input,
      },
      {
        path: '/size',
        component: Size,
      },
      {
        path: '/dialog',
        component: Dialog,
      },
      {
        path: '/sidebar',
        component: Sidebar,
      },
      {
        path: '/toast',
        component: Toast,
      },
    ],
  },
];
