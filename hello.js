/*eslint-env es_modules, node*/
/*eslint-disable semi */
var  {combineReducers, createStore, applyMiddleware} = require ('redux');
var thunkMiddleware = require('redux-thunk').default;
var Immutable = require('immutable');

// actions
const add = (config) => {
    return {
        type: 'add',
        user_id: config.name,
        config: config
    };
};

const remove = (user_id) => {
    return {
        type: 'remove',
        user_id: user_id,
    };
};

const update = (user_id, field, value) => {
    return {
        type: 'update',
        user_id: user_id,
        field: field,
        value: value,
    };
};

const search = (state, user_id) => {
  return Immutable.Map(state).get(user_id, {});
};

//reducer
const user = (state = {}, action) =>{
    if ('add' === action.type){
        return Immutable
        .fromJS(state)
        .set(action.user_id, action.config)
        .toObject();
    }
    if ('remove' === action.type) {
        return Immutable
        .fromJS(state)
        .delete(action.user_id)
        .toObject();
    }
    if('update' === action.type) {
        return Immutable
        .fromJS(state)
        .setIn([action.user_id, action.field], action.value)
        .toObject();
    }
    if ('search' === action.type) {
        return Immutable
        .fromJS(state)
        .get(action.user_id, {});
    }
    return state;
};



const userReducer = combineReducers({
    user
});

let store = createStore(userReducer, applyMiddleware(thunkMiddleware));

var unsubscibe = store.subscribe(() => {
  console.log('sub:' + store.getState()); 
});

store.dispatch(add({
    name: 'victor',
    coin: 1000000,
    level: 9,
}));
store.dispatch(add({
    name: 'Joyce',
    coin: 10000,
    level: 8,
}));
var joyce  = search(store.getState().user,'Joyce');
store.dispatch(update('victor', 'coin', 999000));
store.dispatch(remove('joyce'));


