import React from 'react';

const Toaster = React.lazy(() => import('./examples/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./examples/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./examples/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./examples/base/cards/Cards'));
const Carousels = React.lazy(() => import('./examples/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./examples/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./examples/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./examples/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./examples/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./examples/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./examples/base/navs/Navs'));
const Paginations = React.lazy(() => import('./examples/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./examples/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./examples/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./examples/base/switches/Switches'));

const Tabs = React.lazy(() => import('./examples/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./examples/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./examples/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./examples/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./examples/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./examples/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./examples/charts/Charts'));
const Dashboard = React.lazy(() => import('./examples/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./examples/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./examples/icons/flags/Flags'));
const Brands = React.lazy(() => import('./examples/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./examples/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./examples/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./examples/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./examples/theme/colors/Colors'));
const Typography = React.lazy(() => import('./examples/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./examples/widgets/Widgets'));
const Users = React.lazy(() => import('./examples/users/Users'));
const User = React.lazy(() => import('./examples/users/User'));

const StudioCreate = React.lazy(() => import('./views/studio/Create'));
const NFTWaiting = React.lazy(() => import('./views/nft/Waiting'));
const NFTApproved = React.lazy(() => import('./views/nft/Approved'));
const MarketProducts = React.lazy(() => import('./views/market/Products'));
const UserNFTs = React.lazy(() => import('./views/user/NFTs'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/studio/create', name: '제작', component: StudioCreate },
  { path: '/nft/waiting', name: '심사 대기', component: NFTWaiting },
  { path: '/nft/approved', name: 'NFT Approved', component: NFTApproved },
  { path: '/market/products', name: 'Market Products', component: MarketProducts },
  { path: '/user/nfts', name: 'User NFTs', component: UserNFTs },

  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
