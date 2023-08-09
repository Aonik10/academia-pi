import { NextRequest, NextResponse } from "next/server";
import mercadopago from "mercadopago";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";
import { SERVER_URL } from "@/utils/api_resources";

interface CreatePreferencePayloadAugmented extends CreatePreferencePayload {
    metadata?: {
        [key: string]: any;
    };
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        mercadopago.configure({
            access_token: process.env.MERCADO_PAGO_TOKEN,
        });

        const preference: CreatePreferencePayloadAugmented = {
            items: [
                {
                    title: body.course.title,
                    unit_price: body.userPrice,
                    currency_id: "ARS",
                    quantity: 1,
                },
            ],
            // estas creo que son las rutas a donde te redirecciona la apliación una vez que el pago ha finalizado
            back_urls: {
                success: SERVER_URL + "/dashboard",
                failure: SERVER_URL + "/dashboard",
                pending: SERVER_URL + "/dashboard",
            },
            auto_return: "approved",
            // a esta ruta llegan las noticifaciones de la transaccion que se efectuó y podemos validar si se aprobo el pago
            //notification_url: "https://b5cf-181-92-162-146.ngrok.io" + "/api/payments/mercadopago/webhook",
            notification_url: SERVER_URL + "/api/payments/mercadopago/webhook",
            metadata: { course: body.course, user_id: body.user_id },
        };

        const response = await mercadopago.preferences.create(preference);

        return NextResponse.json({ message: "Success", redirectUrl: response.body.init_point }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Something went wrong", error: error.message }, { status: 400 });
    }
}
