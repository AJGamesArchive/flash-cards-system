// Core Imports
import './SetCreationLimitCard.css';
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { UseAdminConfigHook } from '../../hook/admin/UseAdminConfig';
import { classNames } from 'primereact/utils';
import commonColors from '../../static/Colors';
import WindowSize from '../../types/core/WindowSize';
import TripleButton from '../core/TripleButton';
import getReadableTimestamp from '../../functions/global/Timestamps';

// Component Props Interface
interface SetCreationLimitCardProps {
  windowSize: WindowSize;
  adminConfigHandler: UseAdminConfigHook;
  loading: boolean;
};

/**
 * React function to render the debug block component
 * @returns DebugBlock Component
 */
const SetCreationLimitCard: React.FC<SetCreationLimitCardProps> = ({
  windowSize,
  adminConfigHandler,
  loading,
}) => {
  // Return JSX
  return (
    <div className='set-creation-limit-card' style={{
      backgroundColor: commonColors.BackgroundBlue,
      border: `1px solid ${commonColors.BackgroundLightBlue}`,
    }}>
      <b className='admin-settings-title' style={{
        fontSize:
          (windowSize.width > 768)
            ? '2rem'
            : '1.5rem'
      }}>
        Admin Settings
      </b>
      <div className='set-creation-limit-card-title'>
        <b>Set Creation Config</b>
      </div>
      <div className='set-creation-limit-card-title'>
        <b style={{
          color: Number(adminConfigHandler.setCreationConfig?.creationCounter) >= Number(adminConfigHandler.setCreationConfig?.setCreationLimit)
            ? commonColors.Yellow
            : commonColors.Green
        }}>
        {
          (
            adminConfigHandler.setCreationConfig &&
            getReadableTimestamp(
              adminConfigHandler.setCreationConfig.date, true
            ) === getReadableTimestamp(
              new Date().toISOString(), true
            )
          )
          ? adminConfigHandler.setCreationConfig.creationCounter
          : 0
        } </b>
        out of <b style={{
          color: Number(adminConfigHandler.setCreationConfig?.creationCounter) >= Number(adminConfigHandler.setCreationConfig?.setCreationLimit)
            ? commonColors.Yellow
            : commonColors.Green
        }}>
          {adminConfigHandler.setCreationConfig?.setCreationLimit} </b>
        sets have been created today!
      </div>
      <div className='set-creation-limit-card-form-field'>
        <label htmlFor="admin-config-set=creation-limit">
          <b>Set Creation Limit</b>
        </label>
        <div className="p-inputgroup flex-1">
          <InputText 
            id="admin-config-set=creation-limit"
            value={String(adminConfigHandler.setCreationConfig?.setCreationLimit)}
            name={'setCreationLimit'}
            onChange={adminConfigHandler.updateSetCreationLimit}
            className={classNames({ 'p-invalid': adminConfigHandler.setCreationConfig?.setCreationLimit === 0 })}
            placeholder='Enter Set Creation Limit'
            disabled={loading}
            keyfilter={/[0-9]/}
          />
          <Button
            icon='pi pi-save'
            onClick={adminConfigHandler.creationConfigUpdated ? adminConfigHandler.saveSetCreationLimit : undefined}
            disabled={loading}
            severity={adminConfigHandler.creationConfigUpdated ? 'success' : 'secondary'}
          />
        </div>
      </div>
      <div className='set-creation-limit-card-form-field'>
        <b>Reset Today's Set Creation Counter?</b>
        <div className='set-creation-limit-card-form-button-center'>
          <TripleButton
            label='Reset Counter'
            icon='pi pi-sync'
            onTripleClick={adminConfigHandler.resetCreationCounter}
            disabled={loading}
            outlined
          />
        </div>
      </div>
    </div>
  );
};

export default SetCreationLimitCard;