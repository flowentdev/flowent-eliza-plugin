import { Plugin } from '@elizaos/core';
import { getInsightFlowAction } from './actions/getInsightFlow';

export const flowentPlugin: Plugin = {
  name: 'flowent',
  description: 'Flowent plugin for unified data access across multiple sources',
  actions: [getInsightFlowAction],
  evaluators: [],
  providers: []
};

export default flowentPlugin;