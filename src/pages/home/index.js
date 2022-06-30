
import React, { useEffect, useState, createRef } from "react";
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
// import pdfworkerSrc from 'pdfjs-dist/build/pdf.worker.entry.js';
// pdfjs.GlobalWorkerOptions.workerSrc = pdfworkerSrc;

import './index.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cat.net/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Home = React.memo(() => {
    const api = '/api/pdf';

    let [content, setContent] = useState('');
    let [pageNum, setPageNum] = useState(0);
    let [pageArr, setPageArr] = useState([1]);
    let [subHeight, setSubHeight] = useState(0);

    function createIncrementArr(end, start = 1) {
        return Array.from(new Array(end + 1).keys()).slice(start);
    }

    useEffect(() => {
        // 调用代理接口获取数据
        axios.get(api).then((res) => {
            console.log('请求代理接口成功');
            
            const content = res.data;
            setContent(`data:application/pdf;base64,${content}`)
        }, (err) => {
            console.log('请求代理接口失败');
        })
    }, []);

    const loadSuccessHandle = (page) => {
        const pageNum = page?._pdfInfo?.numPages;
        console.log(`该pdf文件一共有${pageNum}页`)
        setPageNum(pageNum);

        if(pageNum > 3) {
            setPageArr(createIncrementArr(3));
        } else {
            setPageArr(createIncrementArr(pageNum));
        }
    }

    const scrollHandler = (e) => {
        // console.log('scrollHeight', e.target.scrollHeight);
        // console.log('scrollTop', e.target.scrollTop);
        // console.log('offsetTop', e.target.offsetTop);
        // console.log('offsetHeight', e.target.offsetHeight);
        // console.log(e)
        if(e.target.scrollTop - subHeight > e.target.offsetHeight) {
            // 滚动超过一页。获取下一波页数
            // debugger
            console.log('滚动超过一页。获取下一波页数');
            setSubHeight(subHeight + e.target.offsetHeight);
            console.log('当前的页数数组', pageArr);
            console.log('总页数', pageNum);
            if(pageArr.length + 1 <= pageNum) {
                setPageArr(createIncrementArr(pageArr.length + 1))
            }
        }
    }
    // let myDocument = createRef();
    // const inputRefFunc = (ref) => {
    //     myDocument = ref;
    //     console.log('************', myDocument);
    //     if(myDocument) {
    //         // debugger
    //         // 添加滚动监听
    //         // myDocument.addEventListener('scroll', scrollHandler)
    //         // myDocument.onscroll = scrollHandler;
    //     }
    // }

    return (
        <div>
            <p>调用的后端接口{api}</p>
            <div className="container" onScroll={scrollHandler}>
                {/* <Document file={'/api/pdf'} onLoadSuccess={loadSuccessHandle}>
                    { pageNum ? new Array(pageNum).fill('').map((n, index) => <Page key={index} pageNumber={index + 1} className='pdfPageStyle' />) : ''}
                </Document> */}
                <Document file={content} onLoadSuccess={loadSuccessHandle} loading={'wait****'}>
                    {/* { pageNum ? new Array(pageNum).fill('').map((n, index) => <Page key={index} pageNumber={index + 1} className='pdfPageStyle' />) : ''} */}
                    { pageArr.map(item => <Page key={item} pageNumber={item} className='pdfPageStyle' />) }
                </Document>
            </div>
        </div>
    )
})

export default Home;