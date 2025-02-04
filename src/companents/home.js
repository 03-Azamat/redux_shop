import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getCategoryList, getProdList} from "../redux/action/action";
import BooksCard from "./card/booksCard";
import Slider from "react-slick";
import Bg from "./../img/image 112.png"
import CategoryCart from "./card/categoryCart";
import {GET_SHOP_PRODUCT_LIST} from "../redux/type/type";
import {api} from "../API/api";


const Home = () => {
    const dispatch = useDispatch()
    const {shopProductList: product} = useSelector(s => s)
    const {shopListCategory: category} = useSelector(s => s)

    useEffect(() => {
        dispatch(getProdList())
        dispatch(getCategoryList())
    }, [])



    const handleSelect = (e) => {
        api(`/books/?ordering=${e.target.value}`)
            .then(({data}) => {
                dispatch({type:GET_SHOP_PRODUCT_LIST , payload:data})
            })
    }

    

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const categorySettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className="min-h-screen">
            <div className="container mx-auto">
                <div className="w-full">
                    <div className="w-full mx-auto">
                        <Slider
                            {...settings}>
                            <div className="bg-gray-900 mx-auto w-full">
                                <img src={Bg} alt=""/>
                            </div>

                            <div className="bg-gray-900 w-full">
                                <img src={Bg} alt=""/>
                                2
                            </div>

                            <div className="bg-gray-900 w-full">
                                <img src={Bg} alt=""/>
                                3
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>

            <div className=" container mx-auto p-10 flex-col md:flex-row items-center mx-auto font-inter">
                <h1 className="pl-4 sm:text-center md:text-center lg:text-left xl:text-left text-3xl w-full text-black py-5 font-bold text-[#010049]">Категории</h1>

                <div className="w-full">
                    <Slider
                        {...categorySettings}>
                        {
                            category.map(el => (
                                <div key={el.id} className="py-2">
                                        <CategoryCart el={el}/>
                                </div>
                            ))
                        }
                    </Slider>
                </div>

                <div className="flex justify-between py-5">
                    <h1 className="pl-4 sm:text-center md:text-center lg:text-left xl:text-left text-3xl w-full text-black py-5 font-bold text-[#010049]">Возможно,
                        Вам понравится</h1>
                    <div className="flex justify-center">
                        <div className="w-96 text-[#010049]">
                            <select
                                onChange={(e)=> handleSelect(e)}
                                className="form-select appearance-none
                                    text-[#010049]
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                <option value="">Сортировка</option>
                                <option value="title">А - Я</option>
                                <option value="-title">Я - A</option>
                                <option value="-price">Дорогие</option>
                                <option value="price">Дешевые</option>
                                <option value="-pub_date">Hoвинки</option>
                            </select>
                        </div>
                        <div>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between flex-wrap">
                    {
                        product.map(el => (
                            <div
                                className=""
                                key={el.id}>
                                <BooksCard el={el}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
export default Home;