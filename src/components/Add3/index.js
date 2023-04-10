import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { TextField, IconButton, Button, Box } from '@mui/material';
import { AddCircle, Delete, RemoveCircle } from '@mui/icons-material';

const TransactionForm = () => {
  const [familyGroupIndex, setFamilyGroupIndex] = useState(0);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    watch,
    setValue,
    trigger,
    formState,
    clearErrors,
    setError,
    ...methods
  } = useForm({
    defaultValues: {
      transaction: {
        chp_reference: '',
        income_period: 'Weekly',
        state: 'NSW',
        rent_effective_date: '',
      },
      familyGroups: [
        {
          family_group_cra_amount: '0',
          family_group_cra_eligi: 'Yes',
          family_group_name: '',
          familyMembers: [
            {
              name: '1',
              date_of_birth: '',
              income: '0',
            },
          ],
        },
      ],
    },
  });

  const { fields: familyGroups, append: appendFamilyGroup, remove: removeFamilyGroup } = useFieldArray({
    control,
    name: 'familyGroups',
  });

  const handleAddFamilyGroup = () => {
    appendFamilyGroup({
      family_group_cra_amount: '0',
      family_group_cra_eligi: 'Yes',
      family_group_name: '',
      familyMembers: [
        {
          name: '',
          date_of_birth: '',
          income: '',
        },
      ],
    });
  };

  const handleDeleteFamilyGroup = (index) => {
    removeFamilyGroup(index);
    setFamilyGroupIndex(Math.min(index, familyGroups.length - 2));
  };

  const handleAddFamilyMember = () => {
    const familyGroup = familyGroups[familyGroupIndex];
    const familyMembers = familyGroup.familyMembers || [];

    setValue(`familyGroups.${familyGroupIndex}.familyMembers`, [
      ...familyMembers,
      {
        name: '',
        date_of_birth: '',
        income: '',
      },
    ]);
  };

  const handleDeleteFamilyMember = (index) => {
    const familyGroup = familyGroups[familyGroupIndex];
    const familyMembers = familyGroup.familyMembers || [];

    setValue(`familyGroups.${familyGroupIndex}.familyMembers`, [
      ...familyMembers.slice(0, index),
      ...familyMembers.slice(index + 1),
    ]);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField {...register('transaction.chp_reference')} label="CHP Reference" variant="outlined" />
        <TextField {...register('transaction.income_period')} label="Income Period" variant="outlined" />
        <TextField {...register('transaction.state')} label="State" variant="outlined" />
        <TextField {...register('transaction.rent_effective_date')} label="Rent Effective Date" variant="outlined" />

        {familyGroups.map((familyGroup, index) => (
          <Box
            key={familyGroup.id}
            sx={{
              border: '1px solid #ccc',
              borderRadius: 2,
              p: 2,
              mt: 2        }}
              boxShadow={familyGroupIndex === index ? '0 0 5px #6c5ce7' : 'none'}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField {...register(`familyGroups.${index}.family_group_name`)} label="Family Group Name" variant="outlined" />
                <IconButton aria-label="delete" onClick={() => handleDeleteFamilyGroup(index)}>
                  <Delete />
                </IconButton>
              </Box>
      
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {familyGroup.familyMembers.map((familyMember, memberIndex) => (
                  <Box
                    key={familyMember.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: familyGroupIndex === index ? '0 0 5px #6c5ce7' : 'none',
                    }}
                  >
                    <TextField {...register(`familyGroups.${index}.familyMembers.${memberIndex}.name`)} label="Name" variant="outlined" />
                    <TextField {...register(`familyGroups.${index}.familyMembers.${memberIndex}.date_of_birth`)} label="Date of Birth" variant="outlined" />
                    <TextField {...register(`familyGroups.${index}.familyMembers.${memberIndex}.income`)} label="Income" variant="outlined" />
                    <IconButton aria-label="delete" onClick={() => handleDeleteFamilyMember(memberIndex)}>
                      <RemoveCircle />
                    </IconButton>
                  </Box>
                ))}
      
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Button variant="contained" onClick={handleAddFamilyMember} startIcon={<AddCircle />}>
                    Add Family Member
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
      
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleAddFamilyGroup} startIcon={<AddCircle />}>
              Add Family Group
            </Button>
          </Box>
      
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 2 }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() =>
                reset({
                  transaction: {
                    chp_reference: '',
                    income_period: 'Weekly',
                    state: 'NSW',
                    rent_effective_date: '',
                  },
                  familyGroups: [
                    {
                      family_group_cra_amount: '0',
                      family_group_cra_eligi: 'Yes',
                      family_group_name: '',
                      familyMembers: [
                        {
                          name: '1',
                          date_of_birth: '',
                          income: '0',
                        },
                      ],
                    },
                  ],
                })
              }
              sx={{ ml: 2 }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </form>
);
};

export default TransactionForm;      
