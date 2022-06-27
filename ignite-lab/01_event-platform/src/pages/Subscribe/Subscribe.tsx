import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import logoImg from '../../assets/images/logo.svg';
import {
  useCreateSubscriberMutation,
  useGetSubscriberByEmailLazyQuery,
} from '../../graphql/generated';

const Subscribe: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [fieldsError, setFieldsError] = useState({
    name: false,
    email: false,
  });

  const navigate = useNavigate();

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  const [geSubscriberByEmail] = useGetSubscriberByEmailLazyQuery();

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();

    setFieldsError({ name: false, email: false });

    if (!name || !email) {
      return setFieldsError({ name: !name, email: !email });
    }

    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const { data: subscriberAlreadyExists } = await geSubscriberByEmail({
            variables: { email },
          });

          if (Boolean(subscriberAlreadyExists?.subscriber?.id)) {
            return resolve(navigate('/event'));
          }

          await createSubscriber({
            variables: {
              name,
              email,
            },
          });

          return resolve(navigate('/event'));
        } catch (error) {
          return reject(error);
        }
      }),
      {
        loading: 'cadastrando...',
        success: <b>Inscrição realizada com sucesso!</b>,
        error: <b>Error ao realizar inscrição, tente novamente.</b>,
      }
    );
  };

  return (
    <div className="h-screen overflow-hidden bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20">
        <div className="max-w-[640px]">
          <img src={logoImg} alt="ignite" />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma{' '}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2 w-full"
          >
            <input
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={`bg-gray-900 rounded px-5 h-14 outline-none ${
                fieldsError.name && 'border border-red-500'
              }`}
              type="text"
              placeholder="Seu nome completo"
            />
            <input
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={classnames(
                'bg-gray-900 rounded px-5 h-14 outline-none',
                { 'border border-red-500': fieldsError.email }
              )}
              type="email"
              placeholder="Digite seu e-mail"
            />
            <button
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <img
        src="/src/assets/images/code-mockup.png"
        className="mt-10"
        alt="code"
      />
    </div>
  );
};

export { Subscribe };

// 48:22
