import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/feedback",
    name: "Feedback",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Feedback.vue"),
  },
  {
    path: '/error/:error',
    name: 'ErrorDisplay',
    props: true,
    component: () =>
        import("../views/ErrorDisplay")
  },
  {
    path: '/feedbackSubmission/:id',
    name: 'FeedbackDetails',
    props: true,
    component: () =>
        import("../views/FeedbackDetails")
  },
  {
    path: '/login',
    name: 'LoginPage',
    props: true,
    component: () =>
        import("../views/LoginPage")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
