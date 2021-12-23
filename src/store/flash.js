export default{
    data () {
        return {
            flashMessage:{
                message:null,
                type:null
            },
        }
    },
    getters: {
        flashMessage(state)
        {
            return state.flashMessage;
        }
    },
    mutations: {
        flash(state,paylaod)
        {
            state.flashMessage = paylaod;
        }
    },
    actions: {
        flash(context,payload)
        {
            context.commit('flash',payload);
        }
    }
}