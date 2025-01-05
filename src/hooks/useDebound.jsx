import { useState, useEffect } from "react";

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        // Thiết lập timeout để cập nhật giá trị debounce
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            setIsLoading(false);
        }, delay);

        // Dọn dẹp timeout mỗi khi giá trị hoặc delay thay đổi
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return [debouncedValue, isLoading];
}

export default useDebounce;
