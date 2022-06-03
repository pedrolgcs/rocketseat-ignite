type ISendMailDTO = {
  to: string;
  subject: string;
  variables: Record<string, unknown>;
  path: string;
};

export { ISendMailDTO };
