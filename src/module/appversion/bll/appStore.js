import actions from './appAction';
import mutations from './appMutation';

const state = {
  apps: []
};

const getters = {
  getSysApps: state => state.apps
};

export default {
  state,
  getters,
  actions,
  mutations
};
