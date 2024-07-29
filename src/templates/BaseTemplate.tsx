
import { AppConfig } from "@/utils/AppConfig";
import { Box } from "@mui/system";

const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {

  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      <Box sx={{ alignSelf: "center", width: "80%", margin: "auto" }}>
        <header className="border-b border-gray-300">
          <div className="pb-8 pt-16">
            <h1 className="text-3xl font-bold text-gray-900">
              {AppConfig.name}
            </h1>
          </div>

          <div className="flex justify-between">
            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.leftNav}
              </ul>
            </nav>

            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.rightNav}
              </ul>
            </nav>
          </div>
        </header>

        <main>{props.children}</main>

        <footer className="border-t border-gray-300 py-8 text-center text-sm">
            &copy; {new Date().getFullYear()} {AppConfig.name}
        </footer>
      </Box>
    </div>
  );
};

export { BaseTemplate };
