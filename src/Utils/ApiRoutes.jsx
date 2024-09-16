const ApiRoutes = {
    LoginUser:{
        path: '/users/loginUser',
        authenticate: false
    },
    SignUp:{
        path: '/users/signupUser',
        authenticate: false
    },
    ForgotPassword:{
        path: '/users/forgotPassword',
        authenticate: false
    },
    ShortenUrl:{
        path: '/shortenURL',
        authenticate: true
    },
    MonthData:{
        path: '/databyMonth',
        authenticate: true
    },
    DayData:{
        path: '/dataByDate',
        authenticate: true
    }
}

export default ApiRoutes;