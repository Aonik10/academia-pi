import Course from "@/database/models/course";
import Inscription from "@/database/models/inscription";
import User from "@/database/models/user";
import mercadopago from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        mercadopago.configure({
            access_token: "TEST-2788276839160573-080410-76aa01eee6c4828032ebff7774e70ebe-1442043400",
        });
        const {
            type,
            data: { id },
        } = await req.json();

        if (type == "payment") {
            const payment = await mercadopago.payment.findById(Number(id));
            const metadata = payment.response.metadata;
            if (payment.body.status == "approved") {
                const inscription = await Inscription.create({
                    user: metadata.user_id,
                    course: metadata.course._id,
                    amount_paid: payment.body.transaction_amount,
                    status: "approved",
                });
                await User.findByIdAndUpdate(
                    metadata.user_id,
                    {
                        $push: { inscriptions: inscription._id },
                    },
                    { upsert: true, new: true }
                );
                await Course.findByIdAndUpdate(
                    metadata.course._id,
                    {
                        $push: { inscriptions: inscription._id },
                    },
                    { upsert: true, new: true }
                );
                return NextResponse.json({ message: "Inscription created", inscription });
            }
        }
    } catch (error: any) {
        return NextResponse.json({ message: "Webhook with error" });
    }
}

/*

mercadopagoResponse {
  body: {
    accounts_info: null,
    acquirer_reconciliation: [],
    additional_info: {
      authentication_code: null,
      available_balance: null,
      ip_address: '181.92.162.146',
      items: [Array],
      nsu_processadora: null
    },
    authorization_code: null,
    binary_mode: false,
    brand_id: null,
    build_version: '3.10.2',
    call_for_authorize_id: null,
    captured: true,
    card: {},
    charges_details: [],
    collector_id: 1442043400,
    corporation_id: null,
    counter_currency: null,
    coupon_amount: 0,
    currency_id: 'ARS',
    date_approved: '2023-08-04T11:24:37.290-04:00',
    date_created: '2023-08-04T11:24:37.254-04:00',
    date_last_updated: '2023-08-04T11:24:37.290-04:00',
    date_of_expiration: null,
    deduction_schema: null,
    description: 'Poparda',
    differential_pricing_id: null,
    external_reference: null,
    fee_details: [ [Object] ],
    financing_group: null,
    id: 1317003451,
    installments: 1,
    integrator_id: null,
    issuer_id: '2005',
    live_mode: false,
    marketplace_owner: null,
    merchant_account_id: null,
    merchant_number: null,
    metadata: { course: [Object] },
    money_release_date: '2023-08-22T11:24:37.290-04:00',
    money_release_schema: null,
    money_release_status: null,
    notification_url: 'https://ee1b-181-92-162-146.ngrok.io/api/payments/mercadopago/webhook',
    operation_type: 'regular_payment',
    order: { id: '10865852022', type: 'mercadopago' },
    payer: {
      first_name: null,
      last_name: null,
      email: 'test_user_80507629@testuser.com',
      identification: [Object],
      phone: [Object],
      type: null,
      entity_type: null,
      id: '1440922047'
    },
    payment_method: { id: 'account_money', issuer_id: '2005', type: 'account_money' },
    payment_method_id: 'account_money',
    payment_type_id: 'account_money',
    platform_id: null,
    point_of_interaction: {
      business_info: [Object],
      transaction_data: [Object],
      type: 'CHECKOUT'
    },
    pos_id: null,
    processing_mode: 'aggregator',
    refunds: [],
    shipping_amount: 0,
    sponsor_id: null,
    statement_descriptor: null,
    status: 'approved',
    status_detail: 'accredited',
    store_id: null,
    tags: null,
    taxes_amount: 0,
    transaction_amount: 2000,
    transaction_amount_refunded: 0,
    transaction_details: {
      acquirer_reference: null,
      external_resource_url: null,
      financial_institution: null,
      installment_amount: 0,
      net_received_amount: 1918,
      overpaid_amount: 0,
      payable_deferral_period: null,
      payment_method_reference_id: null,
      total_paid_amount: 2000
    }
  },
  response: {
    accounts_info: null,
    acquirer_reconciliation: [],
    additional_info: {
      authentication_code: null,
      available_balance: null,
      ip_address: '181.92.162.146',
      items: [Array],
      nsu_processadora: null
    },
    authorization_code: null,
    binary_mode: false,
    brand_id: null,
    build_version: '3.10.2',
    call_for_authorize_id: null,
    captured: true,
    card: {},
    charges_details: [],
    collector_id: 1442043400,
    corporation_id: null,
    counter_currency: null,
    coupon_amount: 0,
    currency_id: 'ARS',
    date_approved: '2023-08-04T11:24:37.290-04:00',
    date_created: '2023-08-04T11:24:37.254-04:00',
    date_last_updated: '2023-08-04T11:24:37.290-04:00',
    date_of_expiration: null,
    deduction_schema: null,
    description: 'Poparda',
    differential_pricing_id: null,
    external_reference: null,
    fee_details: [ [Object] ],
    financing_group: null,
    id: 1317003451,
    installments: 1,
    integrator_id: null,
    issuer_id: '2005',
    live_mode: false,
    marketplace_owner: null,
    merchant_account_id: null,
    merchant_number: null,
    metadata: { course: [Object] },
    money_release_date: '2023-08-22T11:24:37.290-04:00',
    money_release_schema: null,
    money_release_status: null,
    notification_url: 'https://ee1b-181-92-162-146.ngrok.io/api/payments/mercadopago/webhook',
    operation_type: 'regular_payment',
    order: { id: '10865852022', type: 'mercadopago' },
    payer: {
      first_name: null,
      last_name: null,
      email: 'test_user_80507629@testuser.com',
      identification: [Object],
      phone: [Object],
      type: null,
      entity_type: null,
      id: '1440922047'
    },
    payment_method: { id: 'account_money', issuer_id: '2005', type: 'account_money' },
    payment_method_id: 'account_money',
    payment_type_id: 'account_money',
    platform_id: null,
    point_of_interaction: {
      business_info: [Object],
      transaction_data: [Object],
      type: 'CHECKOUT'
    },
    pos_id: null,
    processing_mode: 'aggregator',
    refunds: [],
    shipping_amount: 0,
    sponsor_id: null,
    statement_descriptor: null,
    status: 'approved',
    status_detail: 'accredited',
    store_id: null,
    tags: null,
    taxes_amount: 0,
    transaction_amount: 2000,
    transaction_amount_refunded: 0,
    transaction_details: {
      acquirer_reference: null,
      external_resource_url: null,
      financial_institution: null,
      installment_amount: 0,
      net_received_amount: 1918,
      overpaid_amount: 0,
      payable_deferral_period: null,
      payment_method_reference_id: null,
      total_paid_amount: 2000
    }
  },
  status: 200,
  idempotency: undefined,
  pagination: undefined
}

*/
