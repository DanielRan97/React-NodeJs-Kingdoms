import axsios from 'axios';


const axiosUseres = axsios.create({
    baseURL: `${process.env.REACT_APP_USER_API}`,
})



export default axiosUseres;