import axios from "axios";

const instance = axios.create({
  baseURL: "https://dummyjson.com/",
});

type ResponseType = {
  data: any;
  skip?: number;
  limit?: number;
  total?: number;
};

const get = async (
  url: string,
  params?: any,
  lang = "en"
): Promise<ResponseType | null> => {
  let res;
  try {
    res = await instance.get(url, {
      params: params,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
    });
  } catch (error) {
    return null;
  }
  return res;
};

const post = async (
  url: string,
  form_data: any,
  lang = "en"
): Promise<ResponseType | null> => {
  let res;

  try {
    res = await instance.post(url, form_data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
    });
  } catch (error) {
    return null;
  }

  return res;
};

const put = async (
  url: string,
  form_data: any,
  lang = "en"
): Promise<ResponseType | null> => {
  let res;
  try {
    res = await instance.put(url, form_data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
    });
  } catch (error) {
    return null;
  }

  return res;
};

const multipart = async (
  url: string,
  lang = "en"
): Promise<ResponseType | null> => {
  let res;
  try {
    res = await instance.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        "Accept-Language": lang,
      },
    });
  } catch (error) {
    return null;
  }
  return res;
};

const destroy = async (
  url: string,
  lang = "en"
): Promise<ResponseType | null> => {
  let res;
  try {
    res = await instance.delete(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
    });
  } catch (error) {
    return null;
  }
  return res;
};

export { get, post, put, multipart, destroy };