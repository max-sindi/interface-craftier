import React , { useState } from 'react';
import Variables from './Variables'
import { Tab , TabList , TabPanel , Tabs } from 'react-tabs';
import { useDispatch } from 'react-redux';
import {  updateFilesAction } from 'src/core/store/modules/template/actions';
import Files from 'src/core/Files';

const AppManager = () => {
  const dispatch = useDispatch()
  const [tabIndex, setTabIndex] = useState(0);

  const uploadFilesClickHandler = (evt: any) => {
      Object.values(evt.target.files as Record<number , File>).forEach((file: File, index: number) => {
        const data = new FormData();
        data.append('asset', file)
        dispatch(updateFilesAction(data))
      })
  }

    return (
      <div data-name={'app-manager'} className={'pl-10'}>

        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
          forceRenderTabPanel
          className={' max-h-100-p w-100-p'}
        >
          <TabList className={`d-flex tab-list`}>
            <Tab className={`pr-10`}>Variables</Tab>
            <Tab className={``}>Files</Tab>
          </TabList>

          <div className={'overflow-auto p-5'}>
            <TabPanel>
              <Variables />
            </TabPanel>
            <TabPanel>
              <div className={'mb-10'}>
                <Files/>
              </div>
              <form encType="multipart/form-data">
                <input type="file" name="asset" multiple={true}  onChange={uploadFilesClickHandler}/>
              </form>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    )
}

export default AppManager
