import * as Yup from "yup";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import TextField from "./ui/TextField";
import Button from "./ui/Button";
import { login, registerUser, setAccessToken } from "../api/auth";
import { useAuth } from "../hooks/useAuth";

export function RegisterForm() {
  const { setAuth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Campo obligatorio"),
      email: Yup.string()
        .email("Ingresa un email valido")
        .required("Campo obligatorio"),
      password: Yup.string()
        .min(8, "Ingresa minimo 8 caracteres")
        .required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        await registerUser(values.name, values.email, values.password);

        const userData = await login(values.email, values.password);

        console.log({ userData });

        setAuth({
          user: {
            id: userData.data.user.id,
            username: userData.data.user.username,
          },
          accessToken: userData.accessToken,
        });

        setAccessToken(userData.accessToken);
      } catch (error) {
        let message = "Ah ocurrido un error. Intente nuevamente";
        if (error instanceof Error) {
          message = error.message;
        }
        enqueueSnackbar(message, { variant: "error" });
      }
    },
  });

  return (
    <div className="flex flex-col gap-2 max-w-md sm:min-w-sm">
      <h2 className="text-lg font-semibold">Formulario de registro</h2>
      <p className="text-sm text-gray-500">
        Complete los datos para registrarte en nuestra app
      </p>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <TextField
            label="Nombre completo"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            type="text"
            error={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : undefined
            }
          />

          <TextField
            label="Email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : undefined
            }
          />

          <TextField
            label="Contraseña"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : undefined
            }
          />
        </div>

        <div className="flex flex-col flex-wrap-reverse items-center w-full">
          <Button className="w-full" type="submit">
            Registrar
          </Button>
        </div>
      </form>
    </div>
  );
}
