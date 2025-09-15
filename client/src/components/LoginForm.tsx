import * as Yup from "yup";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import TextField from "./ui/TextField";
import Button from "./ui/Button";
import { login, setAccessToken } from "../api/auth";
import { useAuth } from "../hooks/useAuth";

export function LoginForm() {
  const { setAuth } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Ingresa un email valido")
        .required("Campo obligatorio"),
      password: Yup.string()
        .min(8, "Ingresa minimo 8 caracteres")
        .required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      try {
        const userData = await login(values.email, values.password);
        setAuth({
          user: {
            id: userData.data.user.id,
            username: userData.data.user.username,
          },
          accessToken: userData.accessToken,
        });

        setAccessToken(userData.accessToken);
        enqueueSnackbar(`Bienvenido ${userData.data.user.username}`);
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
      <h2 className="text-lg font-semibold">Iniciar sesión</h2>
      <p className="text-sm text-gray-500">
        Completa tus datos para ingresar a nuestra app
      </p>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
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
