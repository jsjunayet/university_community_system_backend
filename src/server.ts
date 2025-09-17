import app from "./app";
import seedsuperAdmin from "./app/DB";

const PORT = 5000;
seedsuperAdmin();
app.listen(PORT, () => {
  console.log(`Uni Nexus Community is Running ${PORT}`);
});
