import React from 'react';
import { useHistory } from 'react-router-dom';

const ClearHistoryStateComponent: React.FC = () => {
  const history = useHistory();
  if (history.location && history.location.state) {
    history.replace({ ...history.location, state: null });
  }
  return null;
};

export default ClearHistoryStateComponent;
