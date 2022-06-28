
import React, { useEffect, useState } from "react";
// import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
// import pdfworkerSrc from 'pdfjs-dist/build/pdf.worker.entry.js';
// pdfjs.GlobalWorkerOptions.workerSrc = pdfworkerSrc;

import './index.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cat.net/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Home = React.memo(() => {
    const api = '/api/pdf';

    // let [content, setContent] = useState('');
    let [pageNum, setPageNum] = useState(0);

    useEffect(() => {
        // 调用代理接口获取数据
        // axios.get(api).then((res) => {
        //     console.log('请求代理接口成功');
            
        //     const content = res.data;
        //     debugger
        //     // let arrayBuf = new Uint8Array(buffer);
        //     // let blob = new Blob([arrayBuf], {type: 'application/pdf'});
        //     // debugger
        //     // let reader = new FileReader();
        //     // reader.readAsDataURL(blob);
        //     // reader.onload = () => {
        //     //     debugger
        //     //     setContent(reader.result)
        //     // }
        //     setContent(content)
        // }, (err) => {
        //     console.log('请求代理接口失败');
        // })
    }, []);

    const loadSuccessHandle = (page) => {
        const pages = page?._pdfInfo?.numPages;
        setPageNum(pages);
    }

    return (
        <div>
            <p>调用的后端接口{api}</p>
            <div>
                <Document file={'/api/pdf'} onLoadSuccess={loadSuccessHandle}>
                    { pageNum ? new Array(pageNum).fill('').map((n, index) => <Page key={index} pageNumber={index + 1} className='pdfPageStyle' />) : ''}
                </Document>
            </div>
        </div>
    )
})

export default Home;