import * as inscriptionController from "@/database/controllers/inscription.controller";

interface UserPaymentProps {
    params: {
        id: string;
    };
}

export default function UserPayment({ params }: UserPaymentProps) {
    const { id } = params;
    const data = inscriptionController.getById(id);
    console.log(id);

    return <div>{JSON.stringify(data)}</div>;
}
