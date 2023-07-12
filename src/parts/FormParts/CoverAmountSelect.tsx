import { CoverAmountInput } from "@/components/CoverAmountInput";
import { WaiverOption } from "@/components/WaiverOption";
import { useFormikContext } from "formik";
import { get } from "lodash-es";

export const CoverAmountSelect = () => {
  const { values, errors, setFieldValue, getFieldMeta } =
    useFormikContext<any>();
  return (
    <div className="w-full flex flex-wrap divide-y lg:divide-y-0 divide-tatil-grey">
      <div className="basis-full lg:basis-1/2 flex-shrink-0 py-3 flex items-center">
        <div className="basis-full flex-shrink-0 h-full lg:min-h-[100px]">
          <CoverAmountInput
            name="coverAmount"
            value={values.coverAmount}
            onChange={(value: string) => {
              setFieldValue("coverAmount", value ? value : "");
            }}
            error={get(errors, "coverAmount", "") as string}
            touched={getFieldMeta("coverAmount")?.touched}
            placeholder="$1,000,000"
          />
        </div>
      </div>
      <div className="basis-full lg:basis-1/2 flex-shrink-0 py-3 flex items-center">
        <div className="basis-full flex-shrink-0 min-h-[100px] flex flex-col items-start lg:items-end">
          <div className="flex flex-col items-start">
            <div className="font-bold leading-6 text-left mb-3 lg:mb-6 select-none">
              Start your policy today for
            </div>
            <div className="flex flex-col text-left">
              <div className="inline-flex gap-x-2 justify-start lg:justify-end items-end w-full">
                <div
                  id="quote-figure"
                  className="text-3xl font-bold text-tatil-black tracking-wide text-left w-fit"
                >
                  $2,096.00
                </div>
                <span className="text-tatil-black font-light text-sm mb-1">
                  / per month
                </span>
              </div>
              <div className="text-tatil-black font-light text-xs lg:text-sm text-left w-full">
                Pay annually, save $503.20
              </div>
              <a className="my-3 text-tatil-red underline font-light text-xs lg:text-sm cursor-pointer">
                View full table of benefits
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="basis-full flex-shrink-0 py-3 flex items-center">
        <div className="basis-full flex-shrink-0 min-h-[100px] w-full text-left lg:border-t lg:border-tatil-grey py-5 flex flex-col gap-y-5 bg-tatil-white/50">
          <WholeLifeWaivers />
        </div>
      </div>
    </div>
  );
};

export const WholeLifeWaivers = ({
  waivers = [
    {
      icon: "",
      title: "Waiver of Premium on Disability",
      description: "",
      price: "+$350.00",
    },
    {
      icon: "",
      title: "Waiver of Premium on Dismemberment",
      description: "",
      price: "+$350.00",
    },
  ],
}) => {
  return <>{waivers?.map(WaiverOption)}</>;
};
