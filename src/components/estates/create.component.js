import React, { forwardRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../Context/AuthContext";

import Moment from "moment";
import {
    FormControl,
    FormGroup,
    FormHelperText,
    Card,
    Button,
    Typography,
    TextField,
    Tooltip,
    FormLabel,
    Switch,
    FormControlLabel,
    InputAdornment,
    RadioGroup,
    Radio,
    TableRow,
    TableCell,
    TableBody,
    Table,
    MenuItem,
    Grid,Checkbox,
    ListItemText,
    Input,
} from "@material-ui/core";

import {
    AddBox,
    PlaylistAddCheck,
    ContactMail,
    Edit,
    ArrowUpward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn,
    HomeWork,
    Save,
} from "@material-ui/icons";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import "../../assets/css/style.css";

const estateKategory = [
    {value:1, label:"Satilik"},
    {value:2, label:"Kiralik"}, 
]

const estateTypes = [
    {label:"Arsa", value:"1"},
    {label:"Ev", value:"2"},
    {label:"İşyeri", value:"3"},
    {label:"Tarla", value:"4"},
    {label:"Bağ", value:"5"},
    {label:"Bahçe", value:"6"}, 
]

const estateOpportunity = [
    {label:"Fırsat", value:"1"},
    {label:"Fiyat Düştü", value:"2"},  
]

const estatebuildingCondition = [
    {label:"yeni", value:"1"},
    {label:"eski", value:"2"}, 
]

const estateBelonginBank = [
    {label:"Alternatif Bank", value:"1"},
    {label:"Burgan Bank", value:"2"}, 
    {label:"Fibabanka", value:"3"},
    {label:"ING", value:"4"}, 
    {label:"Odeabank", value:"5"},
    {label:"Şekerbank", value:"6"}, 
    {label:"TEB", value:"7"},
    {label:"Türkiye Finans", value:"8"}, 
]

const estateWarmingType = [
    {label:"Doğalgaz(Kombi)", value:"1"},
    {label:"Merkezi", value:"2"}, 
    {label:"Soba", value:"3"},
    {label:"Klima", value:"4"}, 
    {label:"Diğer", value:"5"}, 
]

const estateBuildingStyle = [
    {label:"BetonArme", value:"1"},
    {label:"Çelik", value:"2"}, 
    {label:"Ahşap", value:"3"},
    {label:"Kargir (Yığma)", value:"4"}, 
    {label:"BetonArme - Çelik", value:"5"}, 
    {label:"Yığma - Ahşap", value:"6"}, 
    {label:"Prefabrik", value:"7"}, 
]

const estatePosition = [
    {label:"Kuzey", value:"1"},
    {label:"Güney", value:"2"}, 
    {label:"Dogu", value:"3"},
    {label:"Batı", value:"4"}, 
    {label:"BetonArme - Çelik", value:"5"}, 
    {label:"Güney Dogu", value:"6"}, 
    {label:"Güney Batı", value:"7"}, 
    {label:"Kuzey Dogu", value:"8"}, 
    {label:"Kuzey Batı", value:"9"}, 
]

const estateCreditCardavailable = [
    {label:"Evet", value:"1"},
    {label:"Hayır", value:"2"},   
]

export default function EstateEdit(props) {
    const [t] = useTranslation();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useContext(AuthContext);
   
    const onSubmit = (e) => {
        e.preventDefault();
     console.log("submitted");
 
    }; 
 
    const emptyestate = {
        category: '',
        type: '',
        squaremeters: '',
        status: false, 
        quantity_type:"", 
        quantity:1,  
        estateName:"",
        buildingage:"",
        properties:"",
        tendprice:"",
        opportunity:"",
        belongingBank:"",
        warmingType:""
      };
    
      const [estateState, setEstateState] = useState({ ...emptyestate });
    const onChangeEstateProps = (o, fieldName) => {
        console.log("o ", o)
        console.log("fieldName ", fieldName)
        setEstateState(prev => {
          const varStaff = { ...prev };
          switch (fieldName) {
            case 'category':
              varStaff.category = o;
              break;
            case 'estateType':
              varStaff.type = o;
              break;             
            case 'estateStatus':
              varStaff.status = o;
              break;
            case  "opportunity":
                varStaff.opportunity = o;
                break;
            case  "belongingBank":
                varStaff.belongingBank = o;
                break;
            case  "warmingType":
                varStaff.warmingType = o;
                break;
            case "buildingCondition":
                varStaff.buildingCondition = o;
                break;
            case "buildinStyle":
                varStaff.buildinStyle = o;
                break;
            case "position":
                varStaff.positon = o;
                break;
            default:
              varStaff[fieldName] = o;
          }
          return varStaff;
        });
      };
      console.log("estateState ", estateState)
      const [open, setOpen] = useState(false);
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };
      const [internalFeatures, seTinternalFeatures] = useState([
        {label: "Kablo TV - Uydu", value: "1"},
        {label: "Ocak Doğalgazı", value: "2"},
        {label: "Duşakabinli", value: "3"},
        {label: "Parke", value: "4"},
        {label: "Seramik Zemin", value: "5"},
        {label: "Kapalı Balkon", value: "6"},
        {label: "Laminant Mutfak", value: "7"},
        {label: "Mutfak Mobilyası", value: "8"},
        {label: "Kartonpiyer", value: "9"},
        {label: "Laminant", value: "10"},
        {label: "Panel Kapı", value: "11"},
        {label: "Lake Mutfak", value: "12"},
        {label: "Hilton Banyo", value: "13"},
        {label: "Çelik Kapı", value: "14"},
        {label: "Saten Boya", value: "15"},
        {label: "Açık Balkon", value: "16"}, 
      ]);

      const [externalFeatures, seTexternalFeatures] = useState([
        {label: "Açık Otopark", value: "1"},
        {label: "PVC Doğrama", value: "2"},
        {label: "Hidrofor", value: "3"},
        {label: "Bahçe - Ortak", value: "4"},
        {label: "Isıcam", value: "5"}, 
      ]);

      const [locationFeatures, seTlocationFeatures] = useState([
        {label: "Otobüs", value: "1"},
        {label: "Hastaneye Yakın", value: "2"},
        {label: "Okula Yakın", value: "3"},
        {label: "Caddeye Yakın", value: "4"},
        {label: "Dolmuş", value: "5"},
        {label: "Şehir Manzaralı", value: "6"},
        {label: "Otoban", value: "7"},
        {label: "Havaalanı", value: "8"},
      ])
    return (
        <div className="containerP">
            <ValidatorForm autoComplete="off" onSubmit={onSubmit}>
                <Grid item container spacing={3}>
                    {/* *********************************** 10 Grid ***************************************** */}
                    <Grid item container md={10} className="panelGridRelative">
                        <Card className="panelLargeIcon">
                            <HomeWork fontSize="large" />
                        </Card>
                        <Card className="listViewPaper">
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className="typography"
                            >
                                {t("estateCreate")}
                            </Typography>

                            <FormControlLabel
                                style={{ float: "right" }}
                                control={
                                    <Switch
                                        checked={estateState.status}                                        
                                        onChange={ (e) => {
                                            setEstateState({
                                                ...estateState,
                                                status: !estateState.status,
                                            });
                                        }}
                                        color="primary"
                                    />
                                }
                                label={t("status")}
                            />

                            <Grid item container sm={12}>
                                <Grid container item sm={4} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <label className="selectLabel">
                                                {t("customer")}
                                            </label>
                                            <Select
                                                required
                                                placeholder={t(
                                                    "Mülk Kategorisi"
                                                )}
                                                value={estateState.category}
                                                options={estateKategory}
                                                onChange={(e,o)=>onChangeEstateProps(e,"category")}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaCustomerName")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>
                                <Grid container item sm={2} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <label className="selectLabel">
                                                {t("estateType")}
                                            </label>
                                            <Select
                                                required
                                                placeholder={t(
                                                    "Emlak Türü"
                                                )}
                                                value={estateState.type}
                                                options={estateTypes}
                                                onChange={(e, o) => onChangeEstateProps(e, 'estateType')}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaCustomerName")}
                                            </FormHelperText> 
                                        </FormControl>
                                    </FormGroup>
                                </Grid>
                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <TextValidator
                                                required
                                                label={t("metrekare")}
                                                variant="outlined"
                                                margin="dense"
                                                value={estateState.squaremeters}
                                                onChange={(e) => {
                                                    setEstateState({
                                                        ...estateState,
                                                        squaremeters: e.target.value,
                                                    });
                                                }}
                                               
                                                validators={["isNumber"]}
                                                errorMessages={[
                                                    t("thisIsNotNumber"),
                                                ]}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaInvoiceNumber")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>
                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                            >
                                                <KeyboardDatePicker
                                                    inputVariant="outlined"
                                                    margin="dense"
                                                    id="date-picker-dialog"
                                                    label={t("createdDate")}
                                                    format="dd/MM/yyyy"
                                                    value={estateState.created}
                                                    onChange={(date) =>
                                                        setEstateState({
                                                            ...estateState,
                                                            created: date,
                                                        })
                                                    }
                                                    KeyboardButtonProps={{
                                                        "aria-label":
                                                            "change date",
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                            <FormHelperText>
                                                {t("youNeedaCreatedDate")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>
 
                                <Grid container item sm={6} spacing={0}
                                    style={{ display: "flex" }}
                                >
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <TextValidator
                                                multiline
                                                label={t("MulkAçıklaması")}
                                                variant="outlined"
                                                margin="dense"
                                                value={estateState.due_note}
                                                onChange={(e) => {
                                                    setEstateState({
                                                        ...estateState,
                                                        due_note:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaDueNote")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>
                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <label className="selectLabel">
                                                {t("estateOpportunity")}
                                            </label>
                                            <Select
                                                required
                                                placeholder={t(
                                                    "Fırsat Türü"
                                                )}
                                                value={estateState.opportunity}
                                                options={estateOpportunity}
                                                onChange={(e, o) => onChangeEstateProps(e, 'opportunity')}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaOpporunityName")}
                                            </FormHelperText> 
                                        </FormControl>
                                    </FormGroup>
                                </Grid>
                                
                                <Grid  container  item sm={3} spacing={0}
                                    style={{ display:"flex" }}
                                >
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                            >
                                                <KeyboardDatePicker
                                                    inputVariant="outlined"
                                                    margin="dense"
                                                    id="date-picker-dialog"
                                                    label={t("endDate")}
                                                    format="dd/MM/yyyy"
                                                    value={estateState.due_date}
                                                    onChange={(date) =>
                                                        setEstateState({
                                                            ...estateState,
                                                            due_date: date,
                                                        })
                                                    }
                                                     
                                                    KeyboardButtonProps={{
                                                        "aria-label":
                                                            "change date",
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                            <FormHelperText>
                                                {t("youNeedaEndDate")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>
                                
                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <label className="selectLabel">
                                                {t("internalFeatures")}
                                            </label>
                                            <Select
                                                    isMulti
                                                    styles={{
                                                        singleValue: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            color: "white",
                                                        }),
                                                        control: (base) => ({
                                                            ...base,
                                                            color: "white",
                                                            width: "100%",
                                                            border: 0,
                                                            borderBottom:
                                                                "1px solid #949494",
                                                            borderRadius: 0,
                                                        }),
                                                    }}
                                                    placeholder={t(
                                                        "selectGropName"
                                                    )}
                                                    value={
                                                        estateState.selectedGroupItems
                                                    }//hhh
                                                    options={internalFeatures}
                                                    onChange={(
                                                        selectedOption
                                                    ) => {
                                                        setEstateState({
                                                            ...estateState,
                                                            selectedGroupItems: selectedOption,
                                                        });
                                                    }}
                                                />
                                            
                                        </FormControl>
                                    </FormGroup>
                                </Grid>
                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <label className="selectLabel">
                                                {t("externalFeatures")}
                                            </label>
                                            <Select
                                                    isMulti
                                                    styles={{
                                                        singleValue: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            color: "white",
                                                        }),
                                                        control: (base) => ({
                                                            ...base,
                                                            color: "white",
                                                            width: "100%",
                                                            border: 0,
                                                            borderBottom:
                                                                "1px solid #949494",
                                                            borderRadius: 0,
                                                        }),
                                                    }}
                                                    placeholder={t(
                                                        "selectGropExternal"
                                                    )}
                                                    value={
                                                        estateState.selectedExternalItems
                                                    } 
                                                    options={externalFeatures}
                                                    onChange={(
                                                        selectedOption
                                                    ) => {
                                                        setEstateState({
                                                            ...estateState,
                                                            selectedExternalItems: selectedOption,
                                                        });
                                                    }}
                                                />
                                            
                                        </FormControl>
                                    </FormGroup>
                                </Grid>
                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <label className="selectLabel">
                                                {t("locationFeatures")}
                                            </label>
                                            <Select
                                                    isMulti
                                                    styles={{
                                                        singleValue: (
                                                            base
                                                        ) => ({
                                                            ...base,
                                                            color: "white",
                                                        }),
                                                        control: (base) => ({
                                                            ...base,
                                                            color: "white",
                                                            width: "100%",
                                                            border: 0,
                                                            borderBottom:
                                                                "1px solid #949494",
                                                            borderRadius: 0,
                                                        }),
                                                    }}
                                                    placeholder={t(
                                                        "selectGropLocation"
                                                    )}
                                                    value={
                                                        estateState.selectedLocationItems
                                                    } 
                                                    options={locationFeatures}
                                                    onChange={(
                                                        selectedOption
                                                    ) => {
                                                        setEstateState({
                                                            ...estateState,
                                                            selectedLocationItems: selectedOption,
                                                        });
                                                    }}
                                                />
                                            
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid  container  item sm={3} spacing={0}
                                    style={{ display:"flex" }}
                                >
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}
                                            >
                                                <KeyboardDatePicker
                                                    inputVariant="outlined"
                                                    margin="dense"
                                                    id="date-picker-dialog"
                                                    label={t("toendDate")}
                                                    format="dd/MM/yyyy"
                                                    value={estateState.to_end_date}
                                                    onChange={(date) =>
                                                        setEstateState({
                                                            ...estateState,
                                                            to_end_date: date,
                                                        })
                                                    }
                                                     
                                                    KeyboardButtonProps={{
                                                        "aria-label":
                                                            "change date",
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                            <FormHelperText>
                                                {t("youNeedtoEndDate")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={6} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <TextValidator
                                                multiline
                                                label={t("ihaleŞartnamesi")}
                                                variant="outlined"
                                                margin="dense"
                                                value={estateState.bidSpecification}
                                                onChange={(e) => {
                                                    setEstateState({
                                                        ...estateState,
                                                        bidSpecification:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaBidSpesification")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>               

                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <label className="selectLabel">
                                                {t("buildingCondition")}
                                            </label>
                                            <Select
                                                required
                                                placeholder={t(
                                                    "Durumu"
                                                )}
                                                value={estateState.buildingCondition}
                                                options={estatebuildingCondition}
                                                onChange={(e, o) => onChangeEstateProps(e, 'buildingCondition')}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaBuildingCondition")}
                                            </FormHelperText> 
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <label className="selectLabel">
                                                {t("AvailablByCreditCard")}
                                            </label>
                                            <Select
                                                required
                                                placeholder={t(
                                                    "Credit Card"
                                                )}
                                                value={estateState.credicard}
                                                options={estateCreditCardavailable}                                                
                                                onChange={(selectedOption) => { 
                                                    selectedOption.value==="1" ? 
                                                    setEstateState({
                                                        ...estateState,
                                                        creditcard: true,
                                                    }):
                                                    setEstateState({
                                                        ...estateState,
                                                        creditcard: false,
                                                    });
                                                }}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaCreditCardCondition")}
                                            </FormHelperText> 
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <label className="selectLabel">
                                                {t("buildingCondition")}
                                            </label>
                                            <Select
                                                required
                                                placeholder={t(
                                                    "buildinStyle"
                                                )}
                                                value={estateState.buildinStyle}
                                                options={estateBuildingStyle}
                                                onChange={(e, o) => onChangeEstateProps(e, 'buildinStyle')}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaBuildingStyle")}
                                            </FormHelperText> 
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <label className="selectLabel">
                                                {t("estateWarmingType")}
                                            </label>
                                            <Select
                                                required
                                                placeholder={t(
                                                    "Durumu"
                                                )}
                                                value={estateState.warmingType}
                                                options={estateWarmingType}
                                                onChange={(e, o) => onChangeEstateProps(e, 'warmingType')}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaWarmingType")}
                                            </FormHelperText> 
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <label className="selectLabel">
                                                {t("estatePosition")}
                                            </label>
                                            <Select
                                                required
                                                placeholder={t(
                                                    "Position"
                                                )}
                                                value={estateState.position}
                                                options={estatePosition}
                                                onChange={(e, o) => onChangeEstateProps(e, 'position')}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaBuildingPosition")}
                                            </FormHelperText> 
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <label className="selectLabel">
                                                {t("estateBelongingBank")}
                                            </label>
                                            <Select
                                                required
                                                placeholder={t(
                                                    "Belonging Bank"
                                                )}
                                                value={estateState.belongingBank}
                                                options={estateBelonginBank}
                                                onChange={(e, o) => onChangeEstateProps(e, 'belongingBank')}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaOpporunityName")}
                                            </FormHelperText> 
                                        </FormControl>
                                    </FormGroup>
                                </Grid>
                                
                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <TextValidator
                                                required
                                                label={t("floor")}
                                                variant="outlined"
                                                margin="dense"
                                                value={estateState.floor}
                                                onChange={(e) => {
                                                    setEstateState({
                                                        ...estateState,
                                                        floor: e.target.value,
                                                    });
                                                }}
                                               
                                                validators={["isNumber"]}
                                                errorMessages={[
                                                    t("thisIsNotNumber"),
                                                ]}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaInvoiceNumber")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <TextValidator
                                                required
                                                label={t("bathNum")}
                                                variant="outlined"
                                                margin="dense"
                                                value={estateState.bathNum}
                                                onChange={(e) => {
                                                    setEstateState({
                                                        ...estateState,
                                                        bathNum: e.target.value,
                                                    });
                                                }}
                                               
                                                validators={["isNumber"]}
                                                errorMessages={[
                                                    t("thisIsNotNumber"),
                                                ]}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaInvoiceNumber")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <TextValidator
                                                required
                                                label={t("tenderfee")}
                                                variant="outlined"
                                                margin="dense"
                                                value={estateState.tenderfee}
                                                onChange={(e) => {
                                                    setEstateState({
                                                        ...estateState,
                                                        tenderfee: e.target.value,
                                                    });
                                                }}
                                               
                                                validators={["isNumber"]}
                                                errorMessages={[
                                                    t("thisIsNotNumber"),
                                                ]}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaInvoiceNumber")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid> 
                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                            <TextValidator
                                                required
                                                label={t("tenderPrice")}
                                                variant="outlined"
                                                margin="dense"
                                                value={estateState.tendprice}
                                                onChange={(e) => {
                                                    setEstateState({
                                                        ...estateState,
                                                        tendprice: e.target.value,
                                                    });
                                                }}
                                               
                                                validators={["isNumber"]}
                                                errorMessages={[
                                                    t("thisIsNotNumber"),
                                                ]}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaPriceNumber")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid> 
                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <TextValidator
                                                required
                                                label={t("ageofBuilding")}
                                                variant="outlined"
                                                margin="dense"
                                                value={estateState.buildingage}
                                                onChange={(e) => {
                                                    setEstateState({
                                                        ...estateState,
                                                        buildingage: e.target.value,
                                                    });
                                                }}
                                               
                                                validators={["isNumber"]}
                                                errorMessages={[
                                                    t("thisIsNotNumber"),
                                                ]}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaInvoiceNumber")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={3} spacing={0}>
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <TextValidator
                                                required
                                                label={t("numberOfBalconies")}
                                                variant="outlined"
                                                margin="dense"
                                                value={estateState.numberofBalconies}
                                                onChange={(e) => {
                                                    setEstateState({
                                                        ...estateState,
                                                        numberofBalconies: e.target.value,
                                                    });
                                                }}
                                               
                                                validators={["isNumber"]}
                                                errorMessages={[
                                                    t("thisIsNotNumber"),
                                                ]}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaBalconiesNumber")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                                <Grid container item sm={3} spacing={0}
                                    style={{ display:  "flex" }}
                                >
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <TextValidator
                                                required
                                                label={t("numberofRooms")}
                                                variant="outlined"
                                                margin="dense"
                                                value={estateState.numberofRooms}
                                                onChange={(e) => {
                                                    setEstateState({
                                                        ...estateState,
                                                        numberofRooms: e.target.value,
                                                    });
                                                }}
                                               
                                                validators={["isNumber"]}
                                                errorMessages={[
                                                    t("thisIsNotNumber"),
                                                ]}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaRoomNumber")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>
                                
                                <Grid container item sm={3} spacing={0}
                                    style={{ display:  "flex" }}
                                >
                                    <FormGroup className="FormGroup">
                                        <FormControl>
                                        <TextValidator
                                                required
                                                label={t("numberOfWC")}
                                                variant="outlined"
                                                margin="dense"
                                                value={estateState.numberofwc}
                                                onChange={(e) => {
                                                    setEstateState({
                                                        ...estateState,
                                                        numberofwc: e.target.value,
                                                    });
                                                }}
                                               
                                                validators={["isNumber"]}
                                                errorMessages={[
                                                    t("thisIsNotNumber"),
                                                ]}
                                            />
                                            <FormHelperText>
                                                {t("youNeedaWCNumber")}
                                            </FormHelperText>
                                        </FormControl>
                                    </FormGroup>
                                </Grid>

                            </Grid>
                        </Card>
                        <div className="saveButtonPlace">
                            <Button type="submit" className="glow-on-hover">
                                <Save
                                    fontSize="small"
                                    style={{ marginRight: "15px" }}
                                />
                                {t("save")}
                            </Button>
                        </div>
                    </Grid>
                     {/* *********************************** 2 Grid ***************************************** */}
                    <Grid container item md={2} className="panelGridRelative">
                        <Card className="panelLargeIcon">
                            <ContactMail fontSize="large" />
                        </Card>
                        <Card
                            className="listViewPaper"
                            style={{ marginBottom: "0" }}
                        >
                            <Typography
                                component="h5"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className="typography"
                            >
                                {t("addresses")}
                            </Typography>
                            <Grid item container sm={12} spacing={0}>
                                <FormGroup className="FormGroup">
                                    <FormControl>
                                    <TextValidator
                                        required
                                        label={t("address")}
                                        variant="outlined"
                                        margin="dense"
                                        value={estateState.estateName}
                                        onChange={(e) => {
                                            setEstateState({
                                                ...estateState,
                                                estateName: e.target.value,
                                            });
                                        }}
                                        

                                    />
                                        <FormHelperText>
                                            {t("youNeed an Estate Name")}
                                        </FormHelperText>
                                    </FormControl>
                                </FormGroup>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </ValidatorForm>
        </div>
    );
}
