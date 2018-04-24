var searchDetail = new Vue({
    el: '#searchDetail',
    data: {
        companyId:'',
       intro:{
        Account_Name:'',
        Company_Phone:'',
        GANO:'',
        Official_Website:'',
        Street:'',
        update_time:'',

       },
       basicInfo:{
        Account_Name_En:'',
        Account_Name_Abbr:'',
        USCI_Code:'',
        TAX_Code:'',
        Registration_No:'',
        Legal_Person:'',
        Registered_Capital:'',
        Operation_Status:'',
        Start_Year:'',
        AKA_Name:'',
        FSI_Code:'',
        Ownership:'',
        Employee_Range:'',
        State_Code:'',
        City_Code:'',
        Company_Area_Code:'',
        PostCode:'',
        Business_Scope:'',
       },
       companySize:{
        Employee_Number:'',
        Tracking_Year:'',
        Site_Range:'',
        Site_Number:'',
        Bed_Number_Range:'',
        Bed_Number:'',
        Revenue_Range:'',
        Revenue:'',
        Phone_Range:'',
        Phone_Number:'',
        PC_Range:'',
        PC_Number:'',
        Server_Range:'',
        Server_Number:'',
        Storage_Range:'',
        Storage_Number:'',

       }
    },
    computed: {
        sourceSort: function () {
            return '来源：' + this.source;
        },
        dateSort: function () {
            if (this.create_time)
                return '发布时间：' + formatDate(this.create_time);
        }
    },
    mounted: function () {
        var companyId = getQueryVariable('Seq_No');
        console.log(companyId)
        var self = this;
        axios.get('http://192.168.0.5/api/content/detail/Seq_No/', {
            params: {
                Seq_No: companyId
            }
          })
            .then(function (response) {
                // 头部简介
                self.intro.Account_Name = response.data.data.Account_Name;
                console.log(self.intro.Account_Name)
                self.intro.Company_Phone = response.data.data.Company_Phone;
                self.intro.GANO = response.data.data.GANO;
                self.intro.Official_Website = response.data.data.Official_Website;
                self.intro.Street=response.data.data.Street;
                self.intro.update_time=response.data.data.update_time;
                // 基本信息展示
                self.basicInfo.Account_Name_En=response.data.data.Account_Name_En;
                self.basicInfo.Account_Name_Abbr=response.data.data.Account_Name_Abbr;
                self.basicInfo.USCI_Code=response.data.data.USCI_Code;
                self.basicInfo.TAX_Code=response.data.data.TAX_Code;
                self.basicInfo.Registration_No=response.data.data.Registration_No;
                self.basicInfo.Legal_Person=response.data.data.Legal_Person;
                self.basicInfo.Registered_Capital=response.data.data.Registered_Capital;
                self.basicInfo.Operation_Status=response.data.data.Operation_Status;
                self.basicInfo.Start_Year=response.data.data.Start_Year;
                self.basicInfo.AKA_Name=response.data.data.AKA_Name;
                self.basicInfo.FSI_Code=response.data.data.FSI_Code;
                self.basicInfo.Ownership=response.data.data.Ownership;
                self.basicInfo.Employee_Range=response.data.data.Employee_Range;
                self.basicInfo.State_Code=response.data.data.State_Code;
                self.basicInfo.City_Code=response.data.data.City_Code;
                self.basicInfo.PostCode=response.data.data.PostCode;
                self.basicInfo.Business_Scope=response.data.data.Business_Scope;
                // 公司规模信息
                self.companySize.Employee_Number =response.data.data.Employee_Number ;
                self.companySize.Tracking_Year =response.data.data.Tracking_Year ;
                self.companySize.Site_Range =response.data.data.Site_Range ;
                self.companySize.Site_Number =response.data.data.Site_Number ;
                self.companySize.Bed_Number_Range =response.data.data.Bed_Number_Range ;
                self.companySize.Bed_Number =response.data.data.Bed_Number ;
                self.companySize.Revenue_Range =response.data.data.Revenue_Range ;
                self.companySize.Revenue =response.data.data.Revenue ;
                self.companySize.Phone_Range =response.data.data.Phone_Range ;
                self.companySize.Phone_Number =response.data.data.Phone_Number ;
                self.companySize.PC_Range =response.data.data.PC_Range ;
                self.companySize.PC_Number =response.data.data.PC_Number ;
                self.companySize.Server_Range =response.data.data.Server_Range ;
                self.companySize.Server_Number =response.data.data.Server_Number ;
                self.companySize.Storage_Range =response.data.data.Storage_Range ;
                self.companySize.Storage_Number =response.data.data.Storage_Number ;
                
                
                
                
                
                
                

            })
            .catch(function (error) {
                console.log(error);
            });
       
    }
})