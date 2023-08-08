import styles from "./styles/page.module.scss";
import CarouselHome from "@/components/carousel";
import NavBar from "@/components/Navbar";
import Services from "./services";
import Footer from "./footer";
import { RegisterButton, WhatsAppButton } from "@/components/buttons";

function InscriptionFrame() {
    return (
        <div className={styles.inscription_frame}>
            <RegisterButton text="Acceder" shadow />
        </div>
    );
}

export default function Home() {
    return (
        <div>
            <WhatsAppButton />
            <NavBar />
            <InscriptionFrame />
            <CarouselHome />
            <Services />
            <Footer />
        </div>
    );
}
