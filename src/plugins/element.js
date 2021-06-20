import Vue from 'vue'
import {
    Button,
    Row,
    Col,
    Input,
    Avatar,
    DropdownMenu,
    Dropdown,
    DropdownItem,
    Card,
    Form,
    FormItem,
    Message,
    Carousel,
    CarouselItem,
    Image,
    Icon,
    Backtop,
    Slider,
    Tooltip,
    Scrollbar
} from 'element-ui'

// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';



Vue.component(CollapseTransition.name, CollapseTransition)

Vue.prototype.$message = Message

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Avatar)
Vue.use(DropdownMenu)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Image)
Vue.use(Icon)
Vue.use(Backtop)
Vue.use(Slider)
Vue.use(Tooltip)
Vue.use(Scrollbar)


