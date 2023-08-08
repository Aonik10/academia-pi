import styles from "./styles/page.module.scss";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import NotAvailable from "@/components/NotAvailable";
import error from "../../assets/images/dashboard/undraw_questions.svg";
import User from "@/database/models/user";
import Inscription from "@/database/models/inscription";
import Course from "@/database/models/course";
import MyCourseCard from "@/components/myCourseCard";

export const dynamic = "force-dynamic";

async function getUser(id: string | undefined) {
    if (!id) return;
    const user = await User.findById(id).populate({
        path: "inscriptions",
        model: Inscription,
        populate: {
            path: "course",
            model: Course,
        },
    });
    return user;
}

export default async function DSHome() {
    const session = await getServerSession(authOptions);
    const user = await getUser(session?.user?._id);

    if (user)
        return (
            <div className={styles.dsHome}>
                <div className={styles.titles}>
                    <h1 className={styles.main}>
                        ¡Hola, <span className={styles.emphasis}>{user.firstName}</span>!
                    </h1>
                    <p className={styles.subtitle}>Estos son tus cursos</p>
                    <hr className={styles.line} />
                </div>
                <div className={styles.courses_container}>
                    <div className={styles.current_courses}>
                        {user.inscriptions.map((inscription: any) => (
                            <MyCourseCard inscription={JSON.parse(JSON.stringify(inscription))} />
                        ))}
                    </div>
                </div>
            </div>
        );
    else
        return (
            <NotAvailable
                image={<Image src={error} alt="not_found" width={440} height={440} />}
                title="Ocurrió un error, vuelve a intentarlo en unos minutos"
            />
        );
}

/*

{
  name: 'Emiliano Pellegrino',
  email: 'emp10999@gmail.com',
  image: 'https://lh3.googleusercontent.com/a/AAcHTtcXX7gHaxCgJm1zSG-61m6_2BWW-fk1XOvqWeuT1g=s96-c',
  id: '104124809935526885646',
  randomKey: undefined
}

*/
