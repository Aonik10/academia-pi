"use client";

import styles from "./styles/carousel.module.scss";
import "bootstrap/dist/css/bootstrap.css";

import Carousel from "react-bootstrap/Carousel";

interface CarrouselCaptionItemProps {
    title: string;
    text: string;
}

function CarrouselCaptionItem({ title, text }: CarrouselCaptionItemProps) {
    return (
        <Carousel.Caption className={styles.carrousel_caption_item}>
            <h3 className={styles.caption_title}>{title}</h3>
            <p className={styles.caption_text}>{text}</p>
        </Carousel.Caption>
    );
}

export default function CarouselHome() {
    return (
        <Carousel interval={4000} controls={false} indicators={false}>
            <Carousel.Item>
                <div className={`${styles.slide} ${styles.first}`}>
                    <CarrouselCaptionItem
                        title="First slide label"
                        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                    />
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className={`${styles.slide} ${styles.second}`}>
                    <CarrouselCaptionItem
                        title="Second slide label"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    />
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className={`${styles.slide} ${styles.third}`}>
                    <CarrouselCaptionItem
                        title="Third slide label"
                        text="Praesent commodo cursus magna, vel scelerisque nisl consectetur."
                    />
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

/* 

<div id="carouselExampleIndicators" className="carousel slide vh-100" data-ride="carousel" data-interval="1000">
            <div className="carousel-inner">
                <div className={`carousel-item ${active == 1 ? "active" : ""}`}>
                    <div className={`${styles.slide} ${styles.first}`}></div>
                </div>
                <div className={`carousel-item ${active == 2 ? "active" : ""}`}>
                    <div className={`${styles.slide} ${styles.second}`}></div>
                </div>
                <div className={`carousel-item ${active == 3 ? "active" : ""}`}>
                    <div className={`${styles.slide} ${styles.third}`}></div>
                </div>
            </div>
            <button className="carousel-control-prev" data-slide="prev" onClick={handleClickPrev}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" data-slide="next" onClick={handleClickNext}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
        </div>

*/
