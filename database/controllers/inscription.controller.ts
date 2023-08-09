import Course from "../models/course";
import Inscription from "../models/inscription";
import User from "../models/user";
import { InscriptionCreated, InscriptionStatus } from "@/utils/interfaces";

export async function getUsers(course_id: string) {
    try {
        //agreggate para obtener todos los usuarios inscriptos a esa materia
    } catch (error: any) {
        console.log(error);
    }
}

export async function getCourse(user_id: string) {
    try {
        //agreggate para obtener todos los cursos asociados a ese usuario
    } catch (error: any) {
        console.log(error);
    }
}

export async function getById(id: string) {
    const inscription = await Inscription.findById(id).lean().populate("course");
    return inscription;
}

export async function create(
    user_id: string,
    course_id: string,
    amount: number,
    status: InscriptionStatus
): Promise<InscriptionCreated> {
    const inscription = await Inscription.create({
        user: user_id,
        course: course_id,
        amount_paid: amount,
        status: status,
    });
    await User.findByIdAndUpdate(
        user_id,
        {
            $push: { inscriptions: inscription._id },
        },
        { upsert: true, new: true }
    );
    await Course.findByIdAndUpdate(
        course_id,
        {
            $push: { inscriptions: inscription._id },
        },
        { upsert: true, new: true }
    );
    return inscription;
}

export async function updateStatus(id: string, status: InscriptionStatus) {
    const inscription = await Inscription.findByIdAndUpdate(id, { status }, { new: true }).lean();
    return inscription;
}
