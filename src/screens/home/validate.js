const validate = (values) => {
  const errors = {};
  if (!values.categoryName) {
    errors.categoryName = "Required";
  }
  if (!values.members || !values.members.length) {
    errors.members = { _error: "At least one form must be entered" };
  } else {
    const membersArrayErrors = [];
    values.members.forEach((form, memberIndex) => {
      const memberErrors = {};
      if (!form || !form.name) {
        memberErrors.name = "Required";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (!form || !form.description) {
        memberErrors.description = "Required";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (!form || !form.email) {
        memberErrors.email = "Required";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (!form || !form.aadhar) {
        memberErrors.aadhar = "Required";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (!form || !form.phoneNumber) {
        memberErrors.phoneNumber = "Required";
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (form && form.extraForm && form.extraForm.length) {
        const hobbyArrayErrors = [];
        form.extraForm.forEach((form, hobbyIndex) => {
          if (!form || !form.length) {
            hobbyArrayErrors[hobbyIndex] = "Required";
          }
        });
        if (hobbyArrayErrors.length) {
          memberErrors.extraForm = hobbyArrayErrors;
          membersArrayErrors[memberIndex] = memberErrors;
        }
        if (form.extraForm.length > 5) {
          if (!memberErrors.extraForm) {
            memberErrors.extraForm = [];
          }
          memberErrors.extraForm._error = "No more than five extraForm allowed";
          membersArrayErrors[memberIndex] = memberErrors;
        }
      }
    });
    if (membersArrayErrors.length) {
      errors.members = membersArrayErrors;
    }
  }
  return errors;
};

export default validate;
