function FAQPage() {
    return (
        <div>
            <div className="text-fs-heading font-bold m-5">Dažnai užduodami klausimai</div>
            <div className="rounded-t-lg border mx-5">
                <h2 className="mb-0" id="headingOne">
                    <button
                        className="group flex w-full items-center rounded-t-[15px] border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                        type="button"
                        data-te-collapse-init
                        data-te-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne">
                        Accordion Item #1
                        <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </span>
                    </button>
                </h2>
                <div
                    id="collapseOne"
                    data-te-collapse-item
                    data-te-collapse-show
                    aria-labelledby="headingOne"
                    data-te-parent="#accordionExample">
                    <div className="py-4 px-5">
                        <strong>This is the first item's accordion body.</strong> It is shown by
                        default, until the collapse plugin adds the appropriate classNamees that we
                        use to style each element. These classNamees control the overall appearance,
                        as well as the showing and hiding via CSS transitions. You can modify any of
                        this with custom CSS or overriding our default variables. It's also worth
                        noting that just about any HTML can go within the{' '}
                        <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
            </div>
            <div className="border mx-5">
                <h2 className="mb-0" id="headingTwo">
                    <button
                        className="group relative flex w-full items-center rounded-none border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                        type="button"
                        data-te-collapse-init
                        data-te-collapse-collapsed
                        data-te-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo">
                        Accordion Item #2
                        <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </span>
                    </button>
                </h2>
                <div
                    id="collapseTwo"
                    className="hidden"
                    data-te-collapse-item
                    aria-labelledby="headingTwo"
                    data-te-parent="#accordionExample">
                    <div className="py-4 px-5">
                        <strong>This is the second item's accordion body.</strong> It is hidden by
                        default, until the collapse plugin adds the appropriate classNamees that we
                        use to style each element. These classes control the overall appearance, as
                        well as the showing and hiding via CSS transitions. You can modify any of
                        this with custom CSS or overriding our default variables. It's also worth
                        noting that just about any HTML can go within the{' '}
                        <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
            </div>
            <div className="rounded-b-lg border mx-5">
                <h2 className="accordion-header mb-0" id="headingThree">
                    <button
                        className="group relative flex w-full items-center border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
                        type="button"
                        data-te-collapse-init
                        data-te-collapse-collapsed
                        data-te-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree">
                        Accordion Item #3
                        <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </span>
                    </button>
                </h2>
                <div
                    id="collapseThree"
                    className="hidden"
                    data-te-collapse-item
                    aria-labelledby="headingThree"
                    data-te-parent="#accordionExample">
                    <div className="py-4 px-5">
                        <strong>This is the third item's accordion body.</strong> It is hidden by
                        default, until the collapse plugin adds the appropriate classes that we use
                        to style each element. These classes control the overall appearance, as well
                        as the showing and hiding via CSS transitions. You can modify any of this
                        with custom CSS or overriding our default variables. It's also worth noting
                        that just about any HTML can go within the <code>.accordion-body</code>,
                        though the transition does limit overflow.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQPage;
