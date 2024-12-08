import Layout from './Layout.vue';
import Button from './views/Button.vue';
import Headings from './views/Headings.vue';
import Form from './views/Form.vue';
import Colors from './views/Colors.vue';
import Input from './views/Input.vue';
import Icons from './views/Icons.vue';
import SvgEditor from './views/SvgEditor.vue';
import Size from './views/Size.vue';
import Sidebar from './views/Sidebar.vue';
import Toast from './views/Toast.vue';
import Welcome from './views/Welcome.vue';
import { Paths } from './constants';
import SidebarFund from './views/SidebarFund.vue';
import Layers from './views/Layers.vue';
import Popper from './views/Popper.vue';
import Table from './views/Table.vue';
import Checkbox from './views/Checkbox.vue';
import Pagination from './views/Pagination.vue';
import Menubar from './views/Menubar.vue';
import Editor from './views/Editor.vue';

export const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: Paths.HOME,
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
        path: '/sidebar',
        component: Sidebar,
      },
      {
        path: '/toast',
        component: Toast,
      },

      {
        path: Paths.CHECKBOX,
        component: Checkbox,
      },
      {
        path: Paths.LAYERS,
        component: Layers,
      },
      {
        path: Paths.MENUBAR,
        component: Menubar,
      },
      {
        path: Paths.PAGINATION,
        component: Pagination,
      },
      {
        path: Paths.POPPER,
        component: Popper,
      },
      {
        path: Paths.SIDEBAR_FUND,
        component: SidebarFund,
      },
      {
        path: Paths.TABLE,
        component: Table,
      },
      {
        path: Paths.EDITOR,
        component: Editor,
      },
    ],
  },
];
