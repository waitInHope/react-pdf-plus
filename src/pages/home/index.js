
import React, { useEffect } from "react";
import axios from 'axios';

const Home = React.memo(() => {
    const api = '/api/pdf';

    useEffect(() => {
        // 调用代理接口获取数据
        axios.get(api).then((res) => {
            console.log('请求代理接口成功');
        }, (err) => {
            console.log('请求代理接口失败');
        })
    }, [])

    return (
        <div>
            调用的后端接口{api}
        </div>
    )
})

export default Home;