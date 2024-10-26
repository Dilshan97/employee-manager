/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import SystemUserActions from "./(components)/SystemUserActions";
import SystemUsers from "./(components)/SystemUsers";
export default function Page() {
  
  return (
    <div className="flex flex-col gap-2">
      <SystemUserActions/>

      <SystemUsers/>
    </div>
  );
}
