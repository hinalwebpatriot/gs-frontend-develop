import { createRoutine } from "redux-saga-routines";
import {all, call, put, takeLatest, getContext} from "redux-saga/effects";
import notification from "../../../utils/notification";
import routing from "../../../config/routing";

export const fetchServicesCart = createRoutine("CART_SERVICES_FETCH");
export const pushServicesData = createRoutine("PUSH_SERVICES_DATA");

export function* fetchServicesCartWorker({ payload: id }) {
    yield put(fetchServicesCart.request());
    try {
        const api = yield getContext("api");
        const res = yield call(() => api.cart.getInvoice(id));
        yield put(fetchServicesCart.success(res.data));
    } catch (e) {
        yield put(fetchServicesCart.failure());
    }
}

export function* pushServicesDataWorker({payload}) {
   yield put(pushServicesData.request());
   const { data } = payload;
   console.log(payload)
    try {
        const api = yield getContext("api");
        const res = yield call(() => api.checkout.createOrderServices({invoice_id: data.invoiceId}))
        notification("success", res.data.message);
        payload.push(routing(res.data.id).servicesOrder);
    } catch (err) {
        yield put(pushServicesData.failure());
        if (err.response) {
            notification("error", err.response.data.message);
        }
    }
}



export function* cartServicesWatcher() {
    yield all([
        takeLatest(fetchServicesCart.TRIGGER, fetchServicesCartWorker),
        takeLatest(pushServicesData.TRIGGER, pushServicesDataWorker)
    ]);
}