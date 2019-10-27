import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import { toast } from 'react-toastify';
import { updateSuccess, updateFailure } from './actions';

//import history from '~/services/history';
//import api from '~/services/api';

export function* updateProfile({ payload }) {
    try {
        const { name, email, ...rest } = payload;

        const profile = Object.assign(
            { name, email },
            rest.oldPassword ? rest : {}
        );
        const response = yield call(api.put, 'users', profile);

        toast.success('Atualizado com sucesso!');

        yield put(updateSuccess(response.data));
    } catch (err) {
        toast.error('Erro ao atualizar');
        yield put(updateFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
