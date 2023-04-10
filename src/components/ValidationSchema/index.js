import * as Yup from "yup";


const validationSchema = Yup.object().shape({
  transactions: Yup.object().shape({
    chp_reference: Yup.string().required("required").min(4, "4 chars at least"),
    rent_effective_date: Yup.string().required("required"),
    property_market_rent: Yup.number()
      .required("required")
      .positive()
      .min(1, "min 1")
      .max(10000, " max 10000"),
  }),
  familyGroup: Yup.array().of(
    Yup.object().shape({
      family_group_type: Yup.string().required("required"),
      family_group_name: Yup.string().required("required"),
      family_group_last_rent: Yup.number()
        .required("required")
        .positive()
        .min(1, "min 1")
        .max(10000, " max 10000"),
      nestedArray: Yup.array()
        .of(
          Yup.object().shape({
            date_of_birth: Yup.date('should be data format')
              .max(new Date(), "Date of birth cannot be in the future")
              .required("required"),
            income: Yup.string().when("relationship", {
              is: "Tenant",
              then: Yup.string().required(
                "Income is mandatory if relationship is Tenant"
              ),
              otherwise: Yup.string(),
            }),
            relationship: Yup.string().required("relationship"),
          })
        )
        .test(
          "nestedarray-length",
          function (value) {
            const { parent } = this;
            const { family_group_type } = parent;
            if (family_group_type === "Single" && value.length !== 1) {
              return this.createError({
                message: "familymembers length should be 1",
              });
            } else if (family_group_type === "Couple" && value.length !== 2) {
              return this.createError({
                message: "familymembers length should be 2",
              });
            } else if (
              family_group_type === "Single 1-2 kids" &&
              (value.length < 2 || value.length > 3)
            ) {
              return this.createError({
                message: "familymembers length should be 2 or 3",
              });
            } else if (
              family_group_type === "Single 3+ kids" &&
              value.length <= 3
            ) {
              return this.createError({
                message: "familymembers length should be more than 3",
              });
            } else if (
              family_group_type === "Couple 1-2 kids" &&
              (value.length < 3 || value.length > 4)
            ) {
              return this.createError({
                message: "familymembers length should be 3 or 4",
              });
            } else if (
              family_group_type === "Couple 3+ kids" &&
              value.length <= 4
            ) {
              return this.createError({
                message: "familymembers length should be more than 4",
              });
            }
            return true;
          }
        ),
    })
  ).test(
    "familyGroup-length",
    "dsdsdsds",
    function (value) {
      console.log(value, 'valueee')
      const fgNames = value.map(obj => obj.family_group_name);
      console.log(fgNames, 'fgNames')
      const isUnique = new Set(fgNames).size === value.length;
      return isUnique ? true : this.createError({
        message: "family group names should be unique",
      });
    }
   
  )
});

export default validationSchema;
