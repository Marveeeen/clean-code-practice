import { useCommonDispatch, useDialog } from '@samsung/nw-common';
import { useEffect, useState } from 'react';

import { useAppSelector } from '../../../hooks/redux';
import { PageLayout } from '../../../layouts/PageLayout';
import { getTroubleTicketingData, getTroubleTicketingDataList } from '../../../redux/apps/trouble-ticketing/actions';
import type { TReactComponent } from '../../../types/Misc';
import { FormMode } from './constants';
import { ContentLayout } from './layouts/ContentLayout';
import { LeftNavBarLayout } from './layouts/LeftNavBarLayout';
import { PageContainer } from './styles';
import { TFormMode, TRuleName } from './types';
import { openCancelDialog } from './utils/helperFunctions';

export const TroubleTicketing: TReactComponent = (props) => {
  const [formMode, setFormMode] = useState<TFormMode>(FormMode.READ);

  const [ruleNames, setRuleNames] = useState<TRuleName[]>([]);
  const [filterRuleNames, setFilterRuleNames] = useState<TRuleName[]>(ruleNames);
  const [searchRuleName, setSearchRuleName] = useState<string>('');
  const [selectedRuleName, setSelectedRuleName] = useState('');

  const [isActive, setIsActive] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const { troubleTicketingRuleNames } = useAppSelector((state) => state.troubleTicketing);
  const { dispatch } = useCommonDispatch();
  const { openCommonDialog } = useDialog();

  useEffect(() => {
    dispatch(getTroubleTicketingDataList());
  }, []);

  useEffect(() => {
    if (formMode === FormMode.READ) {
      dispatch(getTroubleTicketingDataList());
      if ([FormMode.READ, FormMode.DELETE].includes(formMode) && !isSelected && troubleTicketingRuleNames?.length > 0) {
        dispatch(getTroubleTicketingData(troubleTicketingRuleNames[0]));
      }
    } else setIsSearchMode(false);
  }, [formMode]);

  useEffect(() => {
    if ([FormMode.READ, FormMode.DELETE].includes(formMode) && !isSelected && troubleTicketingRuleNames) {
      setRuleNames(
        troubleTicketingRuleNames?.map((ruleName, index) => ({
          name: ruleName,
          isActive: index === 0,
        }))
      );
      setSelectedRuleName(troubleTicketingRuleNames[0]);
    }
  }, [troubleTicketingRuleNames, isSelected]);

  useEffect(() => {
    if (!isSearchMode) setFilterRuleNames(ruleNames);
  }, [ruleNames, isSearchMode]);

  /* Function Handlers */

  const handleCancelClick = (callback?: () => void) => {
    const checkRuleNames = ruleNames.map((ruleName) => ruleName.name);

    const defaultCallback = () => {
      if (callback) callback();
      handleResetMode();
    };

    if (checkRuleNames.includes('New rule') || formMode === FormMode.UPDATE) {
      openCancelDialog(defaultCallback, openCommonDialog);
    } else {
      defaultCallback();
    }
  };

  const handleClearFilterRule = () => {
    setFilterRuleNames(
      troubleTicketingRuleNames.map((ruleName, index) => ({
        name: ruleName,
        isActive: index === 0,
      }))
    );
    setSearchRuleName('');
  };

  const handleCreateNewRule = (formMode: TFormMode) => {
    handleSetFormMode(formMode);
    handleCreateRuleDummy(troubleTicketingRuleNames);
  };

  const handleCreateRuleDummy = (ruleList: string[]) => {
    setRuleNames([
      { name: 'New rule', isActive: true },
      ...ruleList.map((ruleName) => ({ name: ruleName, isActive: false })),
    ]);
  };

  const handleFilterRule = (ruleName: string) => {
    const filterRuleNames = ruleNames.filter((rule) => rule.name.includes(ruleName));
    setSearchRuleName(ruleName);
    setFilterRuleNames(filterRuleNames);
  };

  const handleIsSelected = (isSelected: boolean) => {
    setIsSelected(isSelected);
  };

  const handleSetIsActive = (isActive: boolean) => {
    setIsActive(isActive);
  };

  const handleSetIsSearchMode = (isSearchMode: boolean) => {
    setIsSearchMode(isSearchMode);
  };

  const handleResetMode = () => {
    handleSetFormMode(FormMode.READ);
    setIsSelected(false);
    handleSetIsActive(false);
  };

  const handleRuleNameIsActive = (ruleName: TRuleName) => {
    const newRuleNames: TRuleName[] = ruleNames
      .filter((ruleName) => ruleName.name !== 'New rule')
      .map((oldRuleName) =>
        oldRuleName.name === ruleName.name
          ? { name: ruleName.name, isActive: true }
          : { name: oldRuleName.name, isActive: false }
      );

    setIsSelected(newRuleNames.filter((ruleName) => ruleName.isActive).length > 0);
    setRuleNames(newRuleNames);
    setSelectedRuleName(ruleName.name);
  };

  const handleSetFormMode = (formMode: TFormMode) => {
    setFormMode(formMode);
  };

  return (
    <PageContainer>
      <PageLayout
        lnbContent={
          <LeftNavBarLayout
            formMode={formMode}
            filterRuleNames={filterRuleNames}
            ruleNames={ruleNames}
            searchRuleName={searchRuleName}
            isSearchMode={isSearchMode}
            handleCancelClick={handleCancelClick}
            handleFilterRule={handleFilterRule}
            handleClearFilterRule={handleClearFilterRule}
            handleSetIsSearchMode={handleSetIsSearchMode}
            onCreateRule={handleCreateNewRule}
            onRuleNameIsActive={handleRuleNameIsActive}
          />
        }
        mainContent={
          <ContentLayout
            formMode={formMode}
            isActive={isActive}
            selectedRuleName={selectedRuleName}
            onSetFormMode={handleSetFormMode}
            onSetIsActive={handleSetIsActive}
            handleCancelClick={handleCancelClick}
            handleIsSelected={handleIsSelected}
          />
        }
      />
    </PageContainer>
  );
};
