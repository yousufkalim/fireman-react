import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CustomRadioButton from '../CustomRadioButton';
import CustomCheckBox from '../CustomCheckBox';
import Button from '@mui/material/Button';
import Rightarrow from '../../assets/rightarrow.png';
import don from '../../assets/donne.svg';
import { useTranslation } from 'react-i18next';
import { Store } from '../../StoreContext';
import { UpdateStore } from '../../StoreContext';
import api from '../../api/index';
import { toast } from 'react-toastify';
//In checked conditions first two are for add radio options and second two are for edit radio options
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const SectionFilter = ({ setToggler, Toggler, setIcon, Icon }) => {
  const [radioValues, setRadioValues] = useState({});
  const [configurationValues, setConfigurationValues] = useState({
    id: '',
  });
  const [filters, setFilters] = useState([]);
  const [filterData, setFilterData] = useState();
  const [filtersCount, setFiltersCount] = useState([]);
  const [checklistId, setchecklistId] = useState('');
  const { t } = useTranslation();
  const store = Store();
  const updatestore = UpdateStore();
  useEffect(() => {
    api('get', `/api/v1/casefiles/section_filters/${store?.caseFileId ? store?.caseFileId : 0}`).then((res) => {
      setFilterData(res?.data);
      if (res?.data?.selectedSectionGroupId) {
        setRadioValues({
          groupid: res?.data?.selectedSectionGroupId,
          difficultyLevel: res?.data?.difficultyLevel,
        });
      }
      getTabData();
    });
  }, []);

  const _setState = (key, value, configid) => {
    const obj = {};
    obj[key] = value;
    setRadioValues({
      ...radioValues,
      ...obj,
    });
    //   setConfigurationValues(
    //       {
    //         ...configurationValues,
    //         ...obj,
    //         id:configid
    //       }
    //   )
    if (radioValues.groupid != value && key == 'groupid' && radioValues.groupid != undefined) {
      setRadioValues({
        sectionGroupTypeId: '',
        sectionClassementId: '',
        difficultyLevel: radioValues?.difficultyLevel,
        groupid: value,
      });
      setConfigurationValues({
        configurationOne: '',
        configurationTwo: '',
        configurationThree: '',
      });
      setFilters([]);
      setFiltersCount([]);
    }
  };

  //////for configurationvalues
  const setState = (key, value, configid) => {
    const obj = {};
    obj[key] = value;
    setConfigurationValues({
      ...configurationValues,
      ...obj,
      id: configid,
    });
    if (radioValues.groupid != value && key == 'groupid' && radioValues.groupid != undefined) {
      setConfigurationValues({
        configurationOne: '',
        configurationTwo: '',
        configurationThree: '',
      });
    }
  };

  ///for filter
  const setCheckBoxFilters = (key, value, checked, sectionGroupId, filterType, index) => {
    const obj = { sectionGroupId: sectionGroupId };
    obj[key] = value;

    const obj2 = {
      filtertype: filterType,
      index: index,
    };
    setFiltersCount((pre) => [...pre, obj2]);
    if (checked) {
      setFilters((pre) => [...pre, obj]);
    }
    if (!checked) {
      setFiltersCount((pre) => [...pre.filter((_) => _?.filtertype != filterType)]);
      setFilters((pre) => [...pre.filter((val) => val?.sectionFilterId != value)]);
      filterData?.groups
        .filter((val) => val?.sectionGroupId == sectionGroupId)
        .map((valueToSearch) => {
          let index = valueToSearch?.sectionFilters?.findIndex((_) => {
            return _?.sectionFilterId == value;
          });
          if (index >= 0) {
            valueToSearch.sectionFilters[index].isSelected = false;
          }
        });
    }
    if (radioValues.groupid != value && key == 'groupid' && radioValues.groupid != undefined) {
      setFilters([]);
      setFiltersCount([]);
    }
  };
  ///
  const getTabData = () => {
    api('get', '/api/v1/categories/getall').then((res) => {
      setchecklistId(res?.data[0]?.sectionCategoryId);
      updatestore({
        implantationDataid: res?.data[0]?.sectionCategoryId,
        filterOrderno: res?.data[0]?.sectionCategoryId,
      });
    });
  };
  ///
  const handleSubmit = (e) => {
    e.preventDefault();
    const alreadychecked = filterData?.groups?.filter((value) => {
      return value?.sectionGroupId == radioValues?.groupid;
    });
    const obj = {
      sectionGroupId: radioValues.groupid,
      sectionGroupTypeId: radioValues?.sectionGroupTypeId
        ? radioValues?.sectionGroupTypeId
        : alreadychecked[0]?.groupTypes
            ?.filter((val) => {
              return val?.isSelected === true;
            })
            .map((values) => values?.sectionGroupTypeId)[0],

      sectionClassementId: radioValues?.sectionClassementId
        ? radioValues?.sectionClassementId
        : alreadychecked[0]?.groupClassements
            ?.filter((val) => {
              return val?.isSelected === true;
            })
            .map((values) => values?.sectionClassementId)[0],

      // configurationOne: configurationValues?.configurationOne
      //   ? configurationValues?.configurationOne
      //   : alreadychecked[0]?.configs?.configurationOne,
      /* ?.filter((val) => {
              return val?.isSelected === true;
            })
            .map((values) => values?.sectionGroupTypeId)[0]
            */
      // configurationTwo: !configurationValues?.configurationTwo
      //   ? alreadychecked[0]?.configs.configurationTwo
      //   : configurationValues?.configurationTwo == 1
      //   ? true
      //   : false,
      // configurationThree: !configurationValues?.configurationThree
      //   ? alreadychecked[0]?.configs.configurationThree
      //   : configurationValues?.configurationThree == 1
      //   ? true
      //   : false,
      caseFileId: store?.caseFileId,
      difficultyLevel: radioValues?.difficultyLevel,
      filters: filters,
    };

    if (store?.caseFileId) {
      if (obj?.sectionGroupId && obj?.difficultyLevel && obj?.sectionGroupTypeId && filters) {
        api('post', '/api/v1/casefiles/save_section_filters', obj).then((res) => {
          if (res?.data?.success === true) {
            toast.success(t('Successfull'));
            updatestore({ Sectionfilterdatasaved: true });
            updatestore({
              activeNavbarTab: 2,
              btnenableImpantation: false,
              implantaion: true,
              Orderno: checklistId,
              implantationDataid: checklistId,
              validatedSections: {
                ...store?.validatedSections,
                sectionfiltervalidated: true,
              },
            });
            setToggler((pre) => {
              return {
                ...pre,
                togglerSectionFilter: false,
              };
            });
            setIcon((pre) => {
              return {
                ...pre,
                iconsectionfilter: true,
              };
            });
          }
        });
      } else {
        toast.error('Veuillez remplir tous les filtres et le niveau de difficulté');
      }
    } else {
      toast.error('ID de dossier manquant');
    }
  };
  return (
    <>
      <Box
        onClick={() => {
          setToggler((pre) => {
            return {
              ...pre,
              togglerSectionFilter: !Toggler.togglerSectionFilter,
            };
          });
        }}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '0.6px solid #C5D3DB',
          padding: '8px 10px',
          backgroundColor: '#3675B7',
          borderRadius: '5px',
          color: '#ffffff',
          width: '96%',
          margin: 'auto',
        }}
      >
        <Typography variant="h6"> reglementaions</Typography>
        {Icon.iconsectionfilter || store?.validatedSections?.sectionfiltervalidated ? <img src={don} /> : null}
      </Box>
      <Accordion
        sx={{
          margin: '10px auto !important',
          borderRadius: '10px',
          width: '97.5%',
        }}
        expanded={Toggler.togglerSectionFilter ? true : false}
      >
        <AccordionSummary sx={{ display: 'none' }} aria-controls="panel1a-content" id="panel1a-header"></AccordionSummary>
        <AccordionDetails>
          <Item sx={{ boxShadow: 'none', width: '97%', margin: 'auto' }}>
            <form type="submit" onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {filterData?.groups?.map((val) => (
                  <>
                    <div style={{ width: '100%', padding: '2% 0%' }} className="heading-establishment">
                      <span className="checklist-heading line">{val?.name}</span>
                      <Box sx={{ textAlign: 'start', width: '5%' }}>
                        <CustomRadioButton
                          setState={setRadioValues}
                          id={val?.sectionGroupId}
                          defaultChecked={val?.sectionGroupId === filterData?.selectedSectionGroupId}
                          For={val?.name}
                          Name="groupid"
                          onChange={(e) => {
                            _setState('groupid', val?.sectionGroupId);
                          }}
                          {...label}
                        />
                      </Box>
                      <Box
                        sx={{
                          borderTop: '3px solid #C5D3DB',
                          width: '100%',
                          marginTop: '12px',
                        }}
                      ></Box>
                    </div>
                    {
                      <>
                        <div className="radio-btn-container">
                          {val?.groupTypes.map((grouptypes) => (
                            <>
                              <div className="radion-btn-text-container">
                                <span style={{ textAlign: 'start' }} className="radio-btn-name-text">
                                  {grouptypes?.name}
                                </span>
                                <CustomRadioButton
                                  checked={
                                    (grouptypes?.sectionGroupTypeId === radioValues?.sectionGroupTypeId &&
                                      val?.sectionGroupId == radioValues?.groupid) ||
                                    (grouptypes?.isSelected &&
                                      !radioValues?.sectionGroupTypeId &&
                                      val?.sectionGroupId == radioValues?.groupid) ||
                                    (grouptypes?.isSelected &&
                                      filterData?.selectedSectionGroupId === val?.sectionGroupId &&
                                      !radioValues?.groupid)
                                    //   ||
                                    //   (grouptypes?.isSelected && filterData?.selectedSectionGroupId===val?.sectionGroupId && val?.sectionGroupId==radioValues?.groupid)
                                  }
                                  onChange={(e) => _setState('sectionGroupTypeId', grouptypes?.sectionGroupTypeId)}
                                  setState={setRadioValues}
                                  Name="types"
                                  For={grouptypes?.name}
                                  btnName={grouptypes?.name}
                                  disabled={val?.sectionGroupId != radioValues?.groupid}
                                />
                              </div>
                            </>
                          ))}
                        </div>
                      </>
                    }
                    {
                      <>
                        <div
                          style={{
                            borderTop: val?.groupClassements.length > 0 ? '1px solid #C5D3DB' : '',
                            width: '100%',
                          }}
                        ></div>
                        <div className="radio-btn-container">
                          {val?.groupClassements.map((groupClassements) => (
                            <>
                              <div style={{ textAlign: 'start' }} className="radion-btn-text-container">
                                <span style={{ width: '80%' }} className="radio-btn-name-text">
                                  {groupClassements?.name}
                                </span>
                                <CustomRadioButton
                                  checked={
                                    (groupClassements?.sectionClassementId === radioValues?.sectionClassementId &&
                                      val?.sectionGroupId == radioValues?.groupid) ||
                                    (groupClassements?.isSelected &&
                                      !radioValues?.sectionClassementId &&
                                      val?.sectionGroupId == radioValues?.groupid) ||
                                    (groupClassements?.isSelected &&
                                      filterData?.selectedSectionGroupId === val?.sectionGroupId &&
                                      !radioValues?.groupid)
                                    //    ||
                                    //    (store.activeCase === "currentcases" && groupClassements?.isSelected && !radioValues?.sectionClassementId)
                                  }
                                  textAlign={true}
                                  onChange={(e) => _setState('sectionClassementId', groupClassements.sectionClassementId)}
                                  setState={setRadioValues}
                                  Name="classements"
                                  For={groupClassements?.name}
                                  btnName={groupClassements?.name}
                                  disabled={val?.sectionGroupId != radioValues?.groupid}
                                />
                              </div>
                            </>
                          ))}
                        </div>
                      </>
                    }
                    <div
                      className="radio-btn-container"
                      style={{
                        borderTop: '1px solid #C5D3DB',
                        width: '99%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0% 0.4%',
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        {val?.sectionFilters
                          ?.filter((val) => val?.filterType == 1)
                          .map((_, i) => (
                            <>
                              <div style={{ width: '25%' }} className="radion-btn-text-container">
                                <span style={{ textAlign: 'start', width: '100%' }} className="radio-btn-name-text">
                                  {_?.name}
                                </span>
                                <CustomCheckBox
                                  onChange={(e) => {
                                    setCheckBoxFilters(
                                      'sectionFilterId',
                                      _?.sectionFilterId,
                                      e.target.checked,
                                      val?.sectionGroupId,
                                      _?.filterType,
                                      i
                                    );
                                  }}
                                  id={_?.sectionFilterId}
                                  setCheckBoxFilters={setFilters}
                                  Name="configrationone"
                                  // For="simplerdc"
                                  btnName="Simple RDC"
                                  disabled={val?.sectionGroupId != radioValues?.groupid}
                                  checked={
                                    (radioValues?.groupid == val?.sectionGroupId &&
                                      filters.filter((value) => value?.sectionFilterId == _?.sectionFilterId).length > 0) ||
                                    (radioValues?.groupid == val?.sectionGroupId && _?.isSelected)
                                  }
                                />
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                    <div
                      className="radio-btn-container"
                      style={{
                        borderTop: '1px solid #C5D3DB',
                        width: '99%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0% 0.4%',
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        {val?.sectionFilters
                          ?.filter((val) => val?.filterType == 2)
                          .map((_, i) => (
                            <>
                              <div style={{ width: '25%' }} className="radion-btn-text-container">
                                <span style={{ textAlign: 'start', width: '100%' }} className="radio-btn-name-text">
                                  {_?.name}
                                </span>
                                <CustomCheckBox
                                  onChange={(e) => {
                                    setCheckBoxFilters(
                                      'sectionFilterId',
                                      _?.sectionFilterId,
                                      e.target.checked,
                                      val?.sectionGroupId,
                                      _?.filterType,
                                      i
                                    );
                                  }}
                                  id={_?.sectionFilterId}
                                  setCheckBoxFilters={setFilters}
                                  Name="configrationone"
                                  // For="simplerdc"
                                  btnName="Simple RDC"
                                  disabled={val?.sectionGroupId != radioValues?.groupid}
                                  checked={
                                    (radioValues?.groupid == val?.sectionGroupId &&
                                      filters.filter((value) => value?.sectionFilterId == _?.sectionFilterId).length > 0) ||
                                    (radioValues?.groupid == val?.sectionGroupId && _?.isSelected)
                                  }
                                />
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                    <div
                      className="radio-btn-container"
                      style={{
                        borderTop: '1px solid #C5D3DB',
                        width: '99%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0% 0.4%',
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        {val?.sectionFilters
                          ?.filter((val) => val?.filterType == 3)
                          .map((_, i) => (
                            <>
                              <div style={{ width: '25%' }} className="radion-btn-text-container">
                                <span style={{ textAlign: 'start', width: '100%' }} className="radio-btn-name-text">
                                  {_?.name}
                                </span>
                                <CustomCheckBox
                                  onChange={(e) => {
                                    setCheckBoxFilters(
                                      'sectionFilterId',
                                      _?.sectionFilterId,
                                      e.target.checked,
                                      val?.sectionGroupId,
                                      _?.filterType,
                                      i
                                    );
                                  }}
                                  id={_?.sectionFilterId}
                                  setCheckBoxFilters={setFilters}
                                  Name="configrationone"
                                  // For="simplerdc"
                                  btnName="Simple RDC"
                                  disabled={val?.sectionGroupId != radioValues?.groupid}
                                  checked={
                                    (radioValues?.groupid == val?.sectionGroupId &&
                                      filters.filter((value) => value?.sectionFilterId == _?.sectionFilterId).length > 0) ||
                                    (radioValues?.groupid == val?.sectionGroupId && _?.isSelected)
                                  }
                                />
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <>
                <div style={{ width: '100%', padding: '1% 0%' }} className="heading-establishment">
                  <span className="checklist-heading line">Niveau de difficulté</span>

                  <Box
                    sx={{
                      borderTop: '3px solid #C5D3DB',
                      width: '100%',
                      marginTop: '12px',
                    }}
                  ></Box>
                </div>
                <div
                  style={{
                    width: '99%',
                    borderBottom: '1px solid #C5D3DB',
                    textAlign: 'start',
                    margin: 'auto',
                  }}
                  className="radion-btn-text-container"
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '83%',
                      padding: '1% 0%',
                    }}
                  >
                    <div style={{ width: '41%' }} className="levels">
                      <span style={{ width: '47%' }} className="radio-btn-name-text">
                        N1
                      </span>
                      <CustomRadioButton
                        checked={radioValues?.difficultyLevel == 1}
                        Name="difficultylevels"
                        For="none"
                        btnName="none"
                        width="auto"
                        onChange={(e) => _setState('difficultyLevel', 1)}
                        setState={setRadioValues}
                      />
                    </div>
                    <div style={{ width: '45%' }} className="levels">
                      <span style={{ width: '46%' }}>N2</span>
                      <CustomRadioButton
                        checked={radioValues?.difficultyLevel == 2}
                        Name="difficultylevels"
                        For="ntwo"
                        btnName="ntwo"
                        width="auto"
                        onChange={(e) => _setState('difficultyLevel', 2)}
                        setState={setRadioValues}
                      />
                    </div>
                    <div style={{ width: '45%' }} className="levels">
                      <span style={{ width: '42%' }} className="radio-btn-name-text">
                        N3
                      </span>
                      <CustomRadioButton
                        checked={radioValues?.difficultyLevel == 3}
                        Name="difficultylevels"
                        For="nthree"
                        btnName="nthree"
                        width="auto"
                        onChange={(e) => _setState('difficultyLevel', 3)}
                        setState={setRadioValues}
                      />
                    </div>
                  </div>
                </div>
              </>
              <Box
                sx={{
                  textAlign: 'right',
                  width: '100%',
                  paddingTop: '5px',
                }}
              >
                {store.activeCase === 'newcase' ? (
                  <Button
                    type="submit"
                    disabled={!store?.validatedSections?.rankingvalidated ? true : false}
                    endIcon={<img className="icon-validate" src={Rightarrow} />}
                    sx={{
                      background: '#3675B7',
                      ':hover': { background: '#3675B7' },
                    }}
                    variant="contained"
                  >
                    {t('VALIDATE')}
                  </Button>
                ) : null}
                {store.activeCase === 'currentcases' ? (
                  <Button
                    type="submit"
                    disabled={!store?.validatedSections?.rankingvalidated && !Icon.iconranking ? true : false}
                    endIcon={<img className="icon-validate" src={Rightarrow} />}
                    sx={{
                      background: '#3675B7',
                      ':hover': { background: '#3675B7' },
                    }}
                    variant="contained"
                  >
                    {t('VALIDATE')}
                  </Button>
                ) : null}
              </Box>
            </form>
          </Item>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SectionFilter;
