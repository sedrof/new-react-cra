

export const config = (access_key=null, respose_type=null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  if (access_key) {
    headers['Authorization'] = `JWT ${access_key}`;
  }
  if (respose_type){
    headers['responseType'] = respose_type
  }
  return { headers };
};