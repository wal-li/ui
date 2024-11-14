import Layout from './Layout.vue';
import Buttons from './views/Buttons.vue';
import Headings from './views/Headings.vue';
import Form from './views/Form.vue';
import Colors from './views/Colors.vue';
import Inputs from './views/Inputs.vue';
import Icons from './views/Icons.vue';
import SvgEditor from './views/SvgEditor.vue';
import Size from './views/Size.vue';
import Dialog from './views/Dialog.vue';
import Sidebar from './views/Sidebar.vue';

export const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      // {
      //   path: '/',
      //   component: Charts,
      // },
      {
        path: '/heading',
        component: Headings,
      },
      {
        path: '/button',
        component: Buttons,
      },
      {
        path: '/form',
        component: Form,
      },
      {
        path: '/',
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
        component: Inputs,
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
    ],
  },
];
