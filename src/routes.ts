import { PATHS } from '@/constants';

import BasicLayout from '@/layouts/Basic.vue';

import HomeView from '@/views/basic/Home.vue';
import ColorView from '@/views/basic/Color.vue';
import TypefaceView from '@/views/basic/Typeface.vue';
import LayoutView from '@/views/basic/Layout.vue';
import AdminLayoutView from '@/views/singles/AdminLayout.vue';
import ComponentView from '@/views/basic/Component.vue';
import HomeIcon from '@/icons/HomeIcon.vue';
import SwatchIcon from '@/icons/SwatchIcon.vue';
import H1Icon from '@/icons/H1Icon.vue';
import SquaresIcon from '@/icons/SquaresIcon.vue';
import ChatBubbleIcon from '@/icons/ChatBubbleIcon.vue';

export const routes = [
  {
    path: PATHS.BASE,
    component: BasicLayout,
    children: [
      {
        label: 'Home',
        path: PATHS.HOME,
        icon: HomeIcon,
        component: HomeView,
      },
      {
        label: 'Colors',
        path: PATHS.COLORS,
        icon: SwatchIcon,
        component: ColorView,
      },
      {
        label: 'Typefaces',
        path: PATHS.TYPEFACES,
        icon: H1Icon,
        component: TypefaceView,
      },
      {
        label: 'Layout',
        path: PATHS.LAYOUT,
        icon: SquaresIcon,
        component: LayoutView,
      },
      {
        label: 'Component',
        path: PATHS.COMPONENT,
        icon: ChatBubbleIcon,
        component: ComponentView,
      },
    ],
  },
  {
    path: PATHS.ADMIN_LAYOUT,
    component: AdminLayoutView,
  },
];
