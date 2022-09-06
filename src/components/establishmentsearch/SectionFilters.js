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
const SectionFilters = ({ setToggler, Toggler, setIcon, Icon }) => {
  const [radioValues, setRadioValues] = useState({});
  const [radioValuesid, setradioValuesid] = useState({});
  const [filters, setFilters] = useState([]);
  const [filterData, setFilterData] = useState();
  const [FilterIdis, setFilterIdis] = useState({
    filterid: [],
  });
  const [checklistId, setchecklistId] = useState('');

  const [mainSelector, setmainSelector] = useState({});
  const [checkBoxesData, setcheckBoxesData] = useState({
    typeone: [],
    typetwo: [],
    groupid: [],
    configurationids: [],
  });

  const { t } = useTranslation();
  const store = Store();
  const updatestore = UpdateStore();
  const radioBtnData = [
    {
      text: 'LaborCode',
      id: '192e',
    },
    {
      text: 'ERP',
      id: '197b',
    },
  ];
  useEffect(() => {
    getSectionFilters();
  }, []);
  ////
  const setPrefilledValues = (data) => {
    if (data) {
      setcheckBoxesData((pre) => {
        return {
          ...pre,
          typeone: data?.groups[0]?.sectionFilters
            .filter((_) => _?.category == '5typesmax' && _?.isSelected)
            .map((__) => {
              return {
                sectionFilterId: __?.sectionFilterId,
                sectionGroupId: 1,
              };
            }),
          typetwo: data?.groups[0]?.sectionFilters
            .filter((_) => _?.category == '2typesmax' && _?.isSelected)
            .map((__) => {
              return {
                sectionFilterId: __?.sectionFilterId,
                sectionGroupId: 1,
              };
            }),
        };
      });
      console.log(
        data?.groups[0]?.sectionFilters
          .filter((_) => _?.category == 'ForAll' && _?.isSelected)
          .map((__) => __?.sectionFilterId)[0],
        'jdj'
      );
      setRadioValues((pre) => {
        return {
          ...pre,
          configurationOne: data?.groups[0]?.sectionFilters
            .filter((_) => _?.category == 'ForAll' && _?.isSelected)
            .map((__) => __?.sectionFilterId)[0],
          difficultyLevel: data?.difficultyLevel,
        };
      });
      setFilterIdis((pre) => {
        return {
          ...pre,
          filterid: data?.groups[0]?.sectionFilters
            .filter(
              (_) =>
                _?.isSelected &&
                (_?.filterType == 7 || _?.filterType == 10 || _?.filterType == 8 || _?.filterType == 6 || _?.filterType == 11)
            )
            .map((__) => {
              return {
                sectionFilterId: __?.sectionFilterId,
                sectionGroupId: 1,
                filterType: __?.filterType,
              };
            }),
        };
      });
    }
  };
  ////
  const getSectionFilters = () => {
    api('get', `/api/v1/casefiles/section_filters/${store?.caseFileId ? store?.caseFileId : 0}`).then((res) => {
      console.log(res, 'res');
      setFilterData(res?.data);
      setPrefilledValues(res?.data);
      // if (res?.data?.selectedSectionGroupId) {
      //   setRadioValues({
      //     groupid: res?.data?.selectedSectionGroupId,
      //     difficultyLevel: res?.data?.difficultyLevel,
      //   });
      // }
      getTabData();
    });
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
  const handleChangeMain = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    const id = e.target.id;
    console.log(id, 'j');
    const obj = {
      sectionFilterId: id,
      sectionGroupId: 1,
    };
    if (checked) {
      setcheckBoxesData((pre) => {
        return {
          ...pre,
          ['groupid']: [...checkBoxesData?.groupid, obj],
        };
      });
    }
    if (!checked) {
      setcheckBoxesData((pre) => {
        return {
          ...pre,
          ['groupid']: [...checkBoxesData?.groupid.filter((item) => item.sectionFilterId != id)],
        };
      });
    }
  };
  ////
  const handleChange = (e, id) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;
    if (
      checked &&
      ((name == 'typeone' && checkBoxesData?.typeone?.length < 5) || (name == 'typetwo' && checkBoxesData?.typetwo.length < 2))
    ) {
      const obj = {
        sectionFilterId: id,
        sectionGroupId: 1,
      };
      if (name == 'typeone') {
        setcheckBoxesData((pre) => {
          return {
            ...pre,
            [name]: [...checkBoxesData?.typeone, obj],
          };
        });
      }
      if (name == 'typetwo') {
        setcheckBoxesData((pre) => {
          return {
            ...pre,
            [name]: [...checkBoxesData?.typetwo, obj],
          };
        });
        if (checkBoxesData?.typeone.length == 0 && id == 81) {
          setRadioValues((pre) => {
            return {
              ...pre,
              ForAll: '',
              configurationOne: '',
            };
          });
        }
      }
    }
    if (!checked) {
      if (name == 'typeone') {
        setcheckBoxesData((pre) => {
          return {
            ...pre,
            [name]: [...checkBoxesData?.typeone.filter((item) => item.sectionFilterId != id)],
          };
        });
        if (checkBoxesData?.typeone.length == 0 && checkBoxesData?.typetwo.filter((_) => _?.sectionFilterId == 81).length == 1) {
          setRadioValues((pre) => {
            return {
              ...pre,
              ForAll: '',
            };
          });
        }
        if (checkBoxesData?.typeone.length == 0 && checkBoxesData?.typetwo.length == 2) {
          setRadioValues((pre) => {
            return {
              ...pre,
              ForAll: '',
            };
          });
        }
        if (checkBoxesData?.typeone.length == 1 && checkBoxesData?.typetwo.length == 2 && radioValues?.configurationOne == 84) {
          setRadioValues((pre) => {
            return {
              ...pre,
              ForAll: '',
              configurationOne: '',
            };
          });
        }
      }
      if (name == 'typetwo') {
        setcheckBoxesData((pre) => {
          return {
            ...pre,
            [name]: [...checkBoxesData?.typetwo.filter((item) => item.sectionFilterId != id)],
          };
        });
        if (checkBoxesData?.typeone.length == 0 && checkBoxesData?.typetwo.filter((_) => _?.sectionFilterId == 81).length == 1) {
          setRadioValues((pre) => {
            return {
              ...pre,
              ForAll: '',
              configurationOne: '',
            };
          });
        }
      }
    }
  };
  const _setFilters = (id, filterType) => {
    const obj = {
      sectionFilterId: id,
      sectionGroupId: 1,
      filterType: filterType,
    };
    setFilterIdis((pre) => {
      return {
        ...pre,
        filterid: [...FilterIdis?.filterid.filter((previd) => previd?.filterType != filterType), obj],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const alreadychecked = filterData?.groups?.filter((value) => {
      return value?.sectionGroupId == radioValues?.groupid;
    });
    const obj = {
      sectionGroupId: 1,
      sectionFilterId: 1,
      sectionClassementId: 1,
      caseFileId: store?.caseFileId,
      difficultyLevel: radioValues?.difficultyLevel,
      filters: checkBoxesData?.typeone.concat(checkBoxesData?.typetwo, checkBoxesData?.groupid, FilterIdis?.filterid),
      configurationOne: radioValues?.configurationOne,
      configurationTwo: radioValues?.configurationTwo,
      configurationThree: radioValues?.configurationThree,
    };

    if (store?.caseFileId) {
      if (obj?.sectionGroupId && obj?.difficultyLevel && obj?.sectionFilterId && filters) {
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
  const _setState = (key, value) => {
    const obj = {};
    obj[key] = value;
    if ((key = 'ForAll' && value == 84 && checkBoxesData?.typetwo.length > 0 && checkBoxesData?.typeone.length == 0)) {
      return;
    }
    setRadioValues({
      ...radioValues,
      ...obj,
    });
  };

  console.log(checkBoxesData, 'checkBoxesData');
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
        <Typography variant="h6"> Reglementaions</Typography>
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
                <>
                  <div style={{ width: '100%', padding: '2% 0%' }} className="heading-establishment">
                    <span className="checklist-heading line" style={{ width: '11%', textAlign: 'start' }}>
                      Regulations
                    </span>
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
                      <div className="main-selector-container">
                        {filterData?.groups[0]?.sectionFilters
                          ?.filter((types) => types?.filterType == 4)
                          .map((_) => (
                            <>
                              <div style={{ textAlign: 'start' }} className="radion-btn-text-container">
                                <span style={{ width: '80%', whiteSpace: 'nowrap' }} className="radio-btn-name-text">
                                  {_?.name}
                                </span>
                                <CustomCheckBox
                                  id={_?.sectionFilterId}
                                  Name={_?.btnName}
                                  For={_?.text}
                                  btnName={_?.text}
                                  onChange={handleChangeMain}
                                />
                              </div>
                            </>
                          ))}
                      </div>
                      <div
                        style={{
                          //   borderTop: val?.groupClassements?.length > 0 ? '1px solid #C5D3DB' : '',
                          width: '100%',
                        }}
                      ></div>
                      <div className="radio-btn-container">
                        {filterData?.groups[0]?.sectionFilters
                          ?.filter((types) => types?.category == '5typesmax')
                          .map((groupClassements) => (
                            <>
                              <div style={{ textAlign: 'start' }} className="radion-btn-text-container">
                                <span style={{ width: '80%' }} className="radio-btn-name-text">
                                  {groupClassements?.name}
                                </span>
                                <CustomCheckBox
                                  textAlign={true}
                                  onChange={(e) => {
                                    handleChange(e, groupClassements?.sectionFilterId);
                                  }}
                                  id={groupClassements?.sectionFilterId}
                                  Name="typeone"
                                  btnName={groupClassements?.name}
                                  checked={
                                    checkBoxesData?.typeone
                                      ?.filter((_) => _?.sectionFilterId == groupClassements?.sectionFilterId)
                                      .map((__) => __?.sectionFilterId)[0] == groupClassements?.sectionFilterId
                                  }
                                />
                              </div>
                            </>
                          ))}
                      </div>

                      <div style={{ width: '100%' }} className="radio-btn-container">
                        {filterData?.groups[0]?.sectionFilters
                          ?.filter((types) => types?.category == '2typesmax')
                          .map((groupClassements) => (
                            <>
                              <div style={{ textAlign: 'start' }} className="radion-btn-text-container">
                                <span style={{ width: '100%' }} className="radio-btn-name-text">
                                  {groupClassements?.name}
                                </span>
                                <CustomCheckBox
                                  onChange={(e) => {
                                    handleChange(e, groupClassements?.sectionFilterId);
                                  }}
                                  textAlign={true}
                                  id={groupClassements?.sectionFilterId}
                                  Name="typetwo"
                                  btnName={groupClassements?.name}
                                  checked={
                                    checkBoxesData?.typetwo
                                      ?.filter((_) => _?.sectionFilterId == groupClassements?.sectionFilterId)
                                      .map((__) => __?.sectionFilterId)[0] == groupClassements?.sectionFilterId
                                  }
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
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '0% 0%',
                    }}
                  >
                    <div style={{ width: '100%', padding: '2% 0%' }} className="heading-establishment">
                      <span className="checklist-heading line" style={{ width: '10%', textAlign: 'start' }}>
                        Category
                      </span>
                      <Box
                        sx={{
                          borderTop: '3px solid #C5D3DB',
                          width: '100%',
                          marginTop: '12px',
                        }}
                      ></Box>
                    </div>
                    <div style={{ display: 'flex' }}>
                      {filterData?.groups[0]?.sectionFilters
                        ?.filter((types) => types?.category == 'ForAll')
                        .map((groupClassements) => (
                          <>
                            <div style={{ width: '20%' }} className="radion-btn-text-container">
                              <span style={{ textAlign: 'center', width: '80%' }} className="radio-btn-name-text">
                                {groupClassements?.name}
                              </span>
                              <CustomRadioButton
                                id={groupClassements?.sectionFilterId}
                                Name="ForAll"
                                For={groupClassements?.name}
                                btnName={groupClassements?.name}
                                onChange={(e) => {
                                  _setState('configurationOne', groupClassements?.sectionFilterId);
                                  _setFilters(groupClassements?.sectionFilterId, groupClassements?.filterType);
                                }}
                                checked={radioValues?.configurationOne == groupClassements?.sectionFilterId}
                                disabled={
                                  checkBoxesData?.typetwo?.filter((_) => _?.sectionFilterId == 81).length == 1 &&
                                  checkBoxesData?.typetwo.length == 1 &&
                                  checkBoxesData?.typeone.length == 0
                                }
                              />
                            </div>
                          </>
                        ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', width: '100%' }}>
                    <span style={{ marginTop: '3%', marginRight: '5%', whiteSpace: 'nowrap' }}>For CTS:</span>
                    <div
                      className="radio-btn-container"
                      style={{
                        width: '99%',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '2% 0.4%',
                      }}
                    >
                      <div style={{ display: 'flex' }}>
                        {filterData?.groups[0]?.sectionFilters
                          ?.filter((types) => types?.filterType == 7)
                          .map((groupClassements) => (
                            <>
                              <div style={{ width: '25%' }} className="radion-btn-text-container">
                                <span style={{ textAlign: 'start', width: '100%' }} className="radio-btn-name-text">
                                  {groupClassements?.name}
                                </span>
                                <CustomRadioButton
                                  id={groupClassements?.sectionFilterId}
                                  Name="ForCTS7"
                                  For={groupClassements?.name}
                                  btnName={groupClassements?.name}
                                  onChange={(e) => {
                                    _setState('configurationTwo', true);
                                    _setFilters(groupClassements?.sectionFilterId, groupClassements?.filterType);
                                  }}
                                  defaultChecked={groupClassements?.isSelected}
                                  width="unset"
                                />
                              </div>
                            </>
                          ))}
                      </div>

                      <div style={{ display: 'flex' }}>
                        {filterData?.groups[0]?.sectionFilters
                          ?.filter((types) => types?.filterType == 10)
                          .map((groupClassements) => (
                            <>
                              <div style={{ width: '25%' }} className="radion-btn-text-container">
                                <span
                                  style={{ textAlign: 'start', width: '100%', whiteSpace: 'nowra' }}
                                  className="radio-btn-name-text"
                                >
                                  {groupClassements?.name}
                                </span>
                                <CustomRadioButton
                                  id={groupClassements?.sectionFilterId}
                                  Name="ForCTS10"
                                  For={groupClassements?.name}
                                  btnName={groupClassements?.name}
                                  onChange={(e) => {
                                    _setState('configurationTwo', true);
                                    _setFilters(groupClassements?.sectionFilterId, groupClassements?.filterType);
                                  }}
                                  defaultChecked={groupClassements?.isSelected}
                                  width="unset"
                                />
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', width: '100%' }}>
                    <span style={{ marginTop: '3%', marginRight: '5%', whiteSpace: 'nowrap' }}>For PS:</span>
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
                        {filterData?.groups[0]?.sectionFilters
                          ?.filter((types) => types?.filterType == 8)
                          .map((groupClassements) => (
                            <>
                              <div style={{ width: '25%' }} className="radion-btn-text-container">
                                <span style={{ textAlign: 'start', width: '100%' }} className="radio-btn-name-text">
                                  {groupClassements?.name}
                                </span>
                                <CustomRadioButton
                                  id={groupClassements?.sectionFilterId}
                                  onChange={(e) => {
                                    _setState('configurationThree', true);
                                    _setFilters(groupClassements?.sectionFilterId, groupClassements?.filterType);
                                  }}
                                  Name="ForPS8"
                                  For={groupClassements?.name}
                                  btnName={groupClassements?.name}
                                  defaultChecked={groupClassements?.isSelected}
                                  width="unset"
                                />
                              </div>
                            </>
                          ))}
                      </div>
                      <div style={{ display: 'flex' }}>
                        {filterData?.groups[0]?.sectionFilters
                          ?.filter((types) => types?.filterType == 11)
                          .map((groupClassements) => (
                            <>
                              <div style={{ width: '25%' }} className="radion-btn-text-container">
                                <span style={{ textAlign: 'start', width: '100%' }} className="radio-btn-name-text">
                                  {groupClassements?.name}
                                </span>
                                <CustomRadioButton
                                  id={groupClassements?.sectionFilterId}
                                  onChange={(e) => {
                                    _setState('configurationThree', true);
                                    _setFilters(groupClassements?.sectionFilterId, groupClassements?.filterType);
                                  }}
                                  Name="ForPS11"
                                  For={groupClassements?.name}
                                  btnName={groupClassements?.name}
                                  defaultChecked={groupClassements?.isSelected}
                                  width="unset"
                                />
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className="radio-btn-container"
                    style={{
                      width: '99%',
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '0% 0.4%',
                    }}
                  ></div>
                </>
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

export default SectionFilters;
