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
    InputLabel,
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
    Widgets,
    Save,
} from "@material-ui/icons";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import "../../assets/css/style.css";

const intOps = [
    {value:1, label:"checkBox"},
    {value:2, label:"radio"},  
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

const internalFeatures = [
    {label: "Kablo TV - Uydu", value: "1"},
    {label: "Ocak Doğalgazı", value: "2"},  
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
    
      const [state, seTstate] = useState({ ...emptyestate });          
      const [gropBoxOpen, seTgropBoxOpen] = useState(false);

      const [estIntFeatures, seTestIntFeatures] = useState({name:""});
      const [intFOpen, seTintFOpen] = useState(false);

      const [changeNewGroupNameJust, seTchangeNewGroupNameJust] = useState("");
     
       // open new group dialog save
    const saveInternalProp = () => {
        
        console.log("internal f ", estIntFeatures)
        seTintFOpen(false);
    };
    console.log("intFOpen ",intFOpen)
    return (
        <div className="containerP">
            <ValidatorForm autoComplete="off" onSubmit={onSubmit}>
                <Grid item container spacing={3}>
                    {/* *********************************** 10 Grid ***************************************** */}
                    <Grid item container md={10} className="panelGridRelative">
                        <Card className="panelLargeIcon">
                            <Widgets fontSize="large" />
                        </Card>
                        <Card className="listViewPaper">
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className="typography"
                            >
                                {t("f4Create")}
                            </Typography> 
                            <Grid item container sm={12}>                                
                                <Grid container item sm={4} spacing={0}>
                                    <Grid container item sm={1} spacing={0}>
                                        <Tooltip title={t("addNewGroupName")}>
                                            <AddBox
                                                onClick={() => {
                                                    seTgropBoxOpen(true);
                                                }}
                                                fontSize="large"
                                                style={{
                                                    margin: "25px 10px 0 5px",
                                                }}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid container item sm={11} spacing={0}>
                                        <FormGroup className="FormGroup">
                                            <InputLabel
                                                htmlFor="group_id"
                                                className="InputLabel"
                                                style={{ margin: "5px" }}
                                            >
                                                {" "}
                                            </InputLabel>
                                            <FormControl>
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
                                                        state.selectedGroupItems
                                                    }
                                                    options={estateTypes}
                                                    onChange={(
                                                        selectedOption
                                                    ) => {
                                                        seTstate({
                                                            ...state,
                                                            selectedGroupItems: selectedOption,
                                                        });
                                                    }}
                                                />
                                            </FormControl>
                                        </FormGroup>
                                    </Grid>
                                </Grid>

                                <Grid container item sm={4} spacing={0}>
                                    <Grid container item sm={1} spacing={0}>
                                        <Tooltip title={t("addNewInternalFeatures")}>
                                            <AddBox
                                                onClick={() => {
                                                    seTintFOpen(true);
                                                }}
                                                fontSize="large"
                                                style={{
                                                    margin: "25px 10px 0 5px",
                                                }}
                                            />
                                        </Tooltip>
                                    </Grid>
                                    <Grid container item sm={11} spacing={0}>
                                        <FormGroup className="FormGroup">
                                            <InputLabel
                                                htmlFor="group_id"
                                                className="InputLabel"
                                                style={{ margin: "5px" }}
                                            >
                                                {" "}
                                            </InputLabel>
                                            <FormControl>
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
                                                        "internal Features"
                                                    )}
                                                    value={
                                                        state.selectedGroupItems
                                                    }
                                                    options={internalFeatures}
                                                    onChange={(
                                                        selectedOption
                                                    ) => {
                                                        seTstate({
                                                            ...state,
                                                            selectedGroupItems: selectedOption,
                                                        });
                                                    }}
                                                />
                                            </FormControl>
                                        </FormGroup>
                                    </Grid>
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
                                        value={state.estateName}
                                        onChange={(e) => {
                                            seTstate({
                                                ...state,
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

            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={gropBoxOpen}
                onClose={() => {
                    seTgropBoxOpen(false);
                }}
            >
                <DialogTitle>{t("addEstate")}</DialogTitle>
                <DialogContent>
                    <FormControl
                        className="FormControl"
                        style={{ width: "100%" }}
                    >
                        <InputLabel htmlFor="group">
                            {t("addEstateName")}
                        </InputLabel>
                        <Input
                            id="group"
                            onChange={(e) => {
                                seTchangeNewGroupNameJust(e.target.value);
                            }}
                        />
                        <InputLabel htmlFor="group">
                            {t("addEstateName")}
                        </InputLabel>
                        <Input
                            id="group"
                            onChange={(e) => {
                                seTchangeNewGroupNameJust(e.target.value);
                            }}
                        />
                        <FormHelperText>{t("addNewEstateName")}</FormHelperText>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            seTgropBoxOpen(false);
                        }}
                        color="primary"
                    >
                        {" "}
                        {t("cancel")}{" "}
                    </Button>
                    <Button  onClick={saveInternalProp} color="primary">
                        {" "}
                        {t("save")}{" "}
                    </Button>
                </DialogActions>
            </Dialog>
{/****************************************************** INTERNAL FEATURES */}

            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={intFOpen}
                onClose={() => {
                    seTintFOpen(false);
                }}
            >
                <DialogTitle>{t("InternalFeature")}</DialogTitle>
                <DialogContent>
                    
                    <FormControl
                        className="FormControl"
                        style={{ width: "100%" }}
                    >
                         
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                            required
                            placeholder={t(
                                "checkProps"
                            )}
                            value={estIntFeatures.chekProps}
                            options={intOps}
                            onChange={(
                                selectedOption
                            ) => {
                                seTestIntFeatures({
                                    ...estIntFeatures,
                                    chekProps: selectedOption,
                                });
                            }}

                            styles={{
                                control: (base) => ({
                                    ...base,
                                    color: "white",
                                    width: "100%",
                                    border: 0,
                                    borderBottom:
                                        "1px solid #949494",
                                    borderRadius: 0,
                                    minWidth: 120,
                                }),
                            }}
                        />
                    </FormControl>
                    <FormControl
                        className="FormControl"
                        style={{ width: "100%" }}
                    >
                          <TextField                            
                            margin="dense"
                            label={t('name')}
                            value={estIntFeatures.name}
                            onChange={(e) => {
                                seTestIntFeatures({
                                    ...estIntFeatures,
                                    name:
                                        e.target.value,
                                });
                            }}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            seTgropBoxOpen(false);
                        }}
                        color="primary"
                    >
                        {" "}
                        {t("cancel")}{" "}
                    </Button>
                    <Button onClick={saveInternalProp} color="primary">
                        {" "}
                        {t("save")}{" "}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
